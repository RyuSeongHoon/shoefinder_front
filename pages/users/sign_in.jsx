import { React, useCallback } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Header from "../../src/components/header";
import Footer from "../../src/components/footer";
import Link from "next/link";
import { Auth } from "aws-amplify";
import router from "next/router";
import { useRecoilState } from "recoil";
import useAuth from "../../src/common/hooks/useAuth";
import { subIdSelector } from "../../src/common/selectors";

const initialValues = {
  email: "",
  password: "",
};

const signInSchema = Yup.object().shape({
  email: Yup.string()
    .email("올바르지 않은 형식의 이메일 입니다")
    .required("이메일을 입력해주세요"),
  password: Yup.string()
    .min(6, "비밀번호는 최소 6글자 이상이어야 합니다")
    .max(30, "비밀번호는 50글자 이하여야 합니다")
    .required("비밀번호를 입력해주세요"),
});

async function amplifysignIn(values) {
  const { email, password } = values;
  try {
    await Auth.signIn(email, password);
    router.push("/");
  } catch (error) {
    console.log("error signing in", error);
  }
}

const Login = () => {
  const [sub, setSub] = useRecoilState(subIdSelector);
  const { updateCurrentUser } = useAuth();

  const onSubmitHandler = useCallback(
    async (signInparams) => {
      try {
        await amplifysignIn(signInparams);
        const { attributes } = await Auth.currentAuthenticatedUser();
        updateCurrentUser(signInparams);

        const sub_id = attributes.sub;
        setSub(sub_id);
      } catch (error) {
        console.log("login error", error);
      }
    },
    [setSub, updateCurrentUser]
  );

  return (
    <main className="main">
      <Header />
      <div className="py-10 mt-6">
        <div className="flex flex-col justify-center ">
          <h3 className="text-4xl font-extrabold text-center">로그인</h3>
          <section>
            <Formik
              initialValues={initialValues}
              validationSchema={signInSchema}
              onSubmit={onSubmitHandler}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
              }) => (
                <div className="flex justify-center">
                  <form onSubmit={handleSubmit} className="p-5 mt-6 shadow-xl">
                    <section className="flex flex-col inputSection">
                      <label htmlFor="email" className="title">
                        이메일
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className="px-3 py-2 mt-2 mb-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none w-96 focus:outline-none focus:ring-gray-700 focus:border-gray-700 sm:text-sm"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                      ></input>
                      <p className="errorMessage">
                        {errors.email && touched.email && errors.email}
                      </p>
                    </section>
                    <section className="inputSection">
                      <label htmlFor="password" className="title">
                        패스워드
                      </label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="password"
                        className="w-full px-3 py-2 mt-2 mb-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-gray-700 focus:border-gray-700 sm:text-sm"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                      ></input>
                      <p className="errorMessage">
                        {errors.password && touched.password && errors.password}
                      </p>
                    </section>
                    <section className="flex flex-col ">
                      <button
                        type="submit"
                        className="p-2 mt-3 mb-2 font-bold text-white bg-yellow-700 border border-white rounded-md hoverBrownButton"
                      >
                        로그인
                      </button>
                      <Link href="/users/sign_up">
                        <a className="p-2 mt-3 mb-3 font-bold text-center text-yellow-700 border border-yellow-700 rounded-md hoverWhiteButton">
                          회원가입
                        </a>
                      </Link>
                    </section>
                  </form>
                </div>
              )}
            </Formik>
          </section>
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </main>
  );
};

export default Login;
