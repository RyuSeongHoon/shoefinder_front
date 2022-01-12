import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Header from "../../src/components/header";
import Footer from "../../src/components/Footer";


const NewContents = () => {
  const initialValues = {
    shoe_name: "",
    shoe_brand: "",
    shoe_size: "",
    shoe_color: "",
  };

  const contentsSchema = Yup.object().shape({
    shoe_name: Yup.string().required("이름을 입력해주세요"),
    shoe_brand: Yup.string().required("브랜드를 입력해주세요"),
    shoe_size: Yup.number().required("사이즈를 골라 주세요"),
    shoe_color: Yup.string().required("색상을 입력해주세요"),
  });

  // const S3 / RDS 로 보내는 함수

  return (
    <wrapper className="wrapper">
      <Header />
      <div className="py-10 mt-6 ">
        <h3 className="text-4xl font-extrabold text-center">컨텐츠 등록</h3>
        <section className="flex justify-center p-3 mt-10">
          <Formik
            initialValues={initialValues}
            validationSchema={contentsSchema}
            // onSubmit={amplifySignUp}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <div className="w-2/5">
                <form onSubmit={handleSubmit} className="w-full p-6 shadow-xl">
                  <section className="flex flex-col w-full">
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

                  <section className="flex flex-col inputSection">
                    <label htmlFor="shoe_brand" className="title">
                      브랜드 명
                    </label>
                    <input
                      id="shoe_brand"
                      name="shoe_brand"
                      type="shoe_brand"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.shoe_brand}
                      className="px-3 py-2 mt-2 mb-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-gray-700 focus:border-gray-700 sm:text-sm"
                    ></input>
                    <p className="errorMessage">
                      {errors.shoe_brand &&
                        touched.shoe_brand &&
                        errors.shoe_brand}
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
                      <label htmlor="shoe_size" className="title">
                        사이즈
                      </label>
                      <section className="pl-64 mb-8">
                        <select id="shoe_size">
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

                  <section className="flex justify-end mt-5">
                    <button
                      type="submit"
                      className="w-32 p-2 mt-3 mb-3 font-bold text-center text-yellow-700 border border-yellow-700 rounded-md hoverWhiteButton"
                    >
                      등록
                    </button>
                  </section>
                </form>
              </div>
            )}
          </Formik>
        </section>
      </div>
      <Footer />
    </wrapper>
  );
};

export default NewContents;
