import React, { useCallback, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Header from "../../src/components/header";
import Footer from "../../src/components/footer";
import useAuth from "../../src/common/hooks/useAuth";
import { Storage } from "aws-amplify";
import { useMutation } from "react-query";
import router from "next/router";
import { Auth } from "aws-amplify";
import { v4 as uuidv4 } from "uuid";
import { createContent } from "../../src/common/api/index";
import { convertObjectToFormData } from "../../src/utils";
import { useRecoilState } from "recoil";
import { post_idSelector, uuidSelector } from "../../src/common/selectors";

const initialValues = {
  shoe_name: "",
  shoe_size: "",
  shoe_color: "",
  image: "",
};

const contentsSchema = Yup.object().shape({
  shoe_name: Yup.string().required("이름을 입력해주세요"),
  shoe_size: Yup.number().required("사이즈를 골라 주세요"),
  shoe_color: Yup.string().required("색상을 입력해주세요"),
});

async function amplifyUpload(values, shoe_brand) {
  const { image } = values;
  try {
    await Storage.put(`${shoe_brand}`, image, {
      level: "public",
      contentType: "file/png",
    });
    router.push("/");
  } catch (error) {
    console.log("error content upload", error);
  }
}

const NewContents = () => {
  const [post_id, setpost_id] = useRecoilState(post_idSelector);
  const onSubmitHandler = useCallback(async (values) => {
    try {
      const { attributes } = await Auth.currentAuthenticatedUser();
      const sub_id = attributes.sub;
      const shoe_brand = post_id;
      await amplifyUpload(values, shoe_brand);
      setpost_id(uuidv4());
      const { shoe_color, shoe_name, shoe_size, image } = values;
      const inputData = {
        shoe_brand,
        shoe_color,
        shoe_name,
        shoe_size,
        sub_id,
        image,
      };
      const formData = convertObjectToFormData({
        modelName: "content",
        data: inputData,
      });

      mutate(formData);
    } catch (error) {
      console.log("error content upload", error);
    }
  }, []);

  const { isAuthenticated } = useAuth();
  const [previewURL, setPreviewURL] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const { mutate } = useMutation(createContent, {
    onSuccess: () => {
      router.push("/");
      alert("컨텐츠 등록이 성공되었습니다");
    },
    onError: (error) => {
      console.log("Mutate-error", error);
    },
  });

  return (
    <main className="main">
      <Header />
      <div className="py-10 mt-6 ">
        <h3 className="text-4xl font-extrabold text-center">컨텐츠 등록</h3>
        <section className="flex justify-center p-3 mt-10">
          <Formik
            initialValues={initialValues}
            validationSchema={contentsSchema}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false);
              onSubmitHandler(values);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
            }) => (
              <div className="w-2/5">
                <form onSubmit={handleSubmit} className="w-full p-6 shadow-xl">
                  <section className="flex flex-col w-full">
                    <div className="flex flex-col pt-4">
                      <label htmlFor="image">
                        {imageFile == null ? (
                          <div className="flex items-center justify-center rounded-md cursor-pointer w-28 h-28">
                            <span className="text-5xl text-gray-400">﹢</span>
                          </div>
                        ) : (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            className="rounded-md cursor-pointer w-28 h-28"
                            src={previewURL}
                            alt=""
                          />
                        )}
                      </label>
                      <input
                        id="image"
                        name="image"
                        type="file"
                        className="hidden pt-4 text-center"
                        accept="image/*"
                        onChange={async (e) => {
                          let reader = new FileReader();
                          let file = e.target.files[0];
                          reader.onloadend = () => {
                            setImageFile(file);
                            setPreviewURL(reader.result);
                          };
                          reader.readAsDataURL(file);
                          setFieldValue("image", e.currentTarget.files[0]);
                        }}
                      ></input>
                      <label
                        htmlFor="image"
                        className="block mb-6 text-sm font-medium text-gray-700"
                      >
                        * 이미지 파일
                      </label>
                    </div>
                    <label htmlFor="shoe_name" className="title">
                      신발이름
                    </label>
                    <input
                      id="shoe_name"
                      name="shoe_name"
                      type="shoe_name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.shoe_name}
                      className="px-3 py-2 mt-2 mb-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-gray-700 focus:border-gray-700 sm:text-sm"
                    ></input>
                    <p className="errorMessage">
                      {errors.shoe_name &&
                        touched.shoe_name &&
                        errors.shoe_name}
                    </p>
                  </section>
                  <section className="flex justify-between w-full inputSection">
                    <section className="flex flex-col w-full flex-start">
                      <label htmlFor="shoe_color" className="title">
                        신발 색상
                      </label>
                      <input
                        id="shoe_color"
                        name="shoe_color"
                        type="shoe_color"
                        autoComplete="shoe_color"
                        className="px-3 py-2 mt-2 mb-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-gray-700 focus:border-gray-700 sm:text-sm"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.shoe_color}
                      ></input>
                      <p className="errorMessage">
                        {errors.shoe_color &&
                          touched.shoe_color &&
                          errors.shoe_color}
                      </p>
                    </section>
                  </section>
                  <section className="flex flex-col inputSection">
                    <section className="flex justify-center mt-8 text-center">
                      <label htmlFor="shoe_size" className="title">
                        사이즈
                      </label>
                      <section className="pl-64 mb-8">
                        <select
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.shoe_size}
                          id="shoe_size"
                          name="shoe_size"
                        >
                          <option value="">사이즈를 골라주세요</option>
                          <option value="240">240</option>
                          <option value="245">245</option>
                          <option value="250">250</option>
                          <option value="255">255</option>
                          <option value="260">260</option>
                          <option value="265">265</option>
                          <option value="270">270</option>
                          <option value="275">275</option>
                          <option value="280">280</option>
                          <option value="285">285</option>
                          <option value="290">290</option>
                        </select>
                      </section>
                    </section>
                  </section>
                  {isAuthenticated ? (
                    <section className="flex justify-end mt-5">
                      <button
                        type="submit"
                        className="w-32 p-2 mt-3 mb-3 font-bold text-center text-yellow-700 border border-yellow-700 rounded-md hoverWhiteButton"
                      >
                        등록
                      </button>
                    </section>
                  ) : (
                    <div className="my-2 text-sm text-gray-400">
                      *로그인 후 업로드 가능
                    </div>
                  )}
                </form>
              </div>
            )}
          </Formik>
        </section>
      </div>
      <Footer />
    </main>
  );
};

export default NewContents;
