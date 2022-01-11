import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Header from "../../src/components/header";
import Footer from "../../src/components/Footer";
import DaumPostcode from "react-daum-postcode";
import { Auth } from "aws-amplify";
import router from "next/router";

const SignUp = () => {
  const [isDaumPost, setIsDaumPost] = useState(false);

  async function amplifySignUp(values) {
    const { username, password, email, address1, address2 } = values;
    const address = address1 + address2;
    try {
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          address,
          email,
        },
      });
      console.log("user", user);
      alert("가입이 완료 되었습니다. ShoeFinder에 오신걸 환영합니다.");
      router.push("/users/welcome");
    } catch (error) {
      console.log("error signing up:", error);
    }
  }

  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    zipcode: "",
    address1: "",
    address2: "",
  };

  const signInSchema = Yup.object().shape({
    username: Yup.string().required("이름을 입력해주세요"),
    email: Yup.string()
      .email("올바르지 않은 형식의 이메일 입니다")
      .required("이메일을 입력해주세요"),
    password: Yup.string()
      .min(6, "비밀번호는 최소 6글자 이상이어야 합니다")
      .max(30, "비밀번호는 50글자 이하여야 합니다")
      .required("비밀번호를 입력해주세요"),
    confirmPassword: Yup.string().when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "비밀번호가 일치하지 않습니다."
      ),
      zipcode: Yup.string(),
      address1: Yup.string(),
      address2: Yup.string(),
    }),
  });

  const handleComplete = (data, setFieldValue) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setFieldValue("zipcode", data.zonecode);
    setFieldValue("address1", fullAddress);
    setIsDaumPost(false);
  };

  return (
    <wrapper className="wrapper">
      <Header />
      <div className="py-10 mt-6 ">
        <h3 className="text-4xl font-extrabold text-center">회원가입</h3>
        <section className="flex justify-center p-3 mt-10">
          <Formik
            initialValues={initialValues}
            validationSchema={signInSchema}
            onSubmit={amplifySignUp}
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
                  <section className="flex flex-col w-1/3">
                    <label htmlFor="usename" className="title">
                      이름*
                    </label>
                    <input
                      id="username"
                      name="username"
                      type="username"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.username}
                      className="px-3 py-2 mt-2 mb-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-gray-700 focus:border-gray-700 sm:text-sm"
                    ></input>
                    <p className="errorMessage">
                      {errors.username && touched.username && errors.username}
                    </p>
                  </section>

                  <section className="flex flex-col inputSection">
                    <label htmlFor="email" className="title">
                      이메일*
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      className="px-3 py-2 mt-2 mb-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-gray-700 focus:border-gray-700 sm:text-sm"
                    ></input>
                    <p className="errorMessage">
                      {errors.email && touched.email && errors.email}
                    </p>
                  </section>
                  <section className="flex justify-between w-full inputSection">
                    <section className="flex flex-col w-1/2 flex-start">
                      <label htmlFor="password" className="title">
                        암호*
                      </label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="password"
                        className="px-3 py-2 mt-2 mb-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-gray-700 focus:border-gray-700 sm:text-sm"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                      ></input>
                      <p className="errorMessage">
                        {errors.password && touched.password && errors.password}
                      </p>
                    </section>
                    <section className="flex flex-col w-1/2 pl-3">
                      <label htmlFor="confirmPassword" className="title">
                        암호 확인*
                      </label>
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        autoComplete="confirmPassword"
                        className="px-3 py-2 mt-2 mb-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-gray-700 focus:border-gray-700 sm:text-sm"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.confirmPassword}
                      ></input>
                      <p className="errorMessage">
                        {errors.confirmPassword &&
                          touched.confirmPassword &&
                          errors.confirmPassword}
                      </p>
                    </section>
                  </section>
                  <section className="flex flex-col inputSection">
                    <label htmlFor="zipcode" className="title ">
                      주소*
                    </label>
                    <section>
                      <input
                        id="zipcode"
                        name="zipcode"
                        type="text"
                        className="w-1/2 px-3 py-2 mt-2 mb-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-gray-700 focus:border-gray-700 sm:text-sm"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.zipcode}
                        placeholder="우편번호"
                        readOnly
                      />

                      <button
                        type="button"
                        className="w-32 p-2 ml-4 font-bold text-white bg-yellow-700 rounded-lg hoverBrownButton"
                        onClick={() => setIsDaumPost(true)}
                      >
                        검색
                      </button>
                    </section>
                  </section>
                  <section className="flex inputSection">
                    <section className="w-1/2">
                      <input
                        id="address1"
                        name="address1"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.address1}
                        className="w-full px-3 py-2 mt-1 mb-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-gray-700 focus:border-gray-700 sm:text-sm"
                        placeholder="주소"
                        readOnly
                      />
                    </section>
                    <section className="w-1/2 pl-3">
                      <input
                        id="address2"
                        name="address2"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.address2}
                        className="w-full px-3 py-2 mt-1 mb-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-gray-700 focus:border-gray-700 sm:text-sm"
                        placeholder="상세주소"
                      />
                    </section>
                  </section>
                  {isDaumPost ? (
                    <DaumPostcode
                      onComplete={(data) => handleComplete(data, setFieldValue)}
                    />
                  ) : null}
                  <section className="flex justify-end mt-5">
                    <button
                      type="submit"
                      className="w-32 p-2 mt-3 mb-3 font-bold text-center text-yellow-700 border border-yellow-700 rounded-md hoverWhiteButton"
                    >
                      회원가입
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

export default SignUp;
