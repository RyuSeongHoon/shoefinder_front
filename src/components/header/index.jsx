import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../public/asset/images/Logo.png";
import { Transition } from "@headlessui/react";
import { isAuthenticated } from "../../common/atom";
import { useRecoilState } from "recoil";
import { Auth } from "aws-amplify";
import router from "next/router";

export default function Header() {
  const [isShowing, setIsShowing] = useState(false);
  const handleMdOpen = () => {
    setIsShowing(!isShowing);
  };
  const [isAutenticate, setIsAutenticate] = useRecoilState(isAuthenticated);

  async function amplifySignOut() {
    try {
      await Auth.signOut();
      setIsAutenticate(false);
      alert("성공적으로 로그아웃 하였습니다");
      router.push("/");

      Auth.currentAuthenticatedUser({
        bypassCache: true,
      })
        .then((user) => console.log("로그아웃시 유저", user))
        .catch((err) => console.log(err));
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }

  return (
    <>
      <nav>
        <header className="flex justify-between shadow-md">
          <section className="flex px-8">
            <div className="cursor-pointer">
              <Link href="/">
                <a>
                  <Image src={Logo} alt="Logo" width={200} height={97} />
                </a>
              </Link>
            </div>
            <div className="flex ml-5 font-bold mt-9">
              <div>
                <Link href="/showList나중에 업데이트 하기">
                  <a className="mr-7 mdHidden">Shoe List</a>
                </Link>
              </div>
              <div>
                <Link href="/contents/new_page">
                  <a className="mdHidden">Shoe Register</a>
                </Link>
              </div>
            </div>
          </section>
          <section className="flex mr-20 font-bold">
            <div className="px-5 mdHidden mt-9">
              {isAutenticate ? (
                <Link href="/users/my">
                  <a className="mr-5">My page</a>
                </Link>
              ) : (
                <Link href="/users/sign_in">
                  <a className="mr-5">Login</a>
                </Link>
              )}
            </div>
            <div className="px-5 pt-3 mt-6 rounded-lg bg-brown-400 mb-7 mdHidden ">
              {isAutenticate ? (
                <button
                  className="font-bold"
                  onClick={() => {
                    amplifySignOut();
                  }}
                >
                  LogOut
                </button>
              ) : (
                <Link href="/users/sign_up">
                  <a>SignUp</a>
                </Link>
              )}
            </div>
          </section>
          <div
            className="block m-10 cursor-pointer md:hidden"
            onClick={() => setIsShowing((isShowing) => !isShowing)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </header>
        <Transition
          show={isShowing}
          enter="transition-opacity duration-75"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <section
            className="m-5 rounded-lg shadow-lg bg-brown-100 md:hidden"
            style={{ zIndex: 999999 }}
          >
            <div className="flex flex-col">
              <div className="flex justify-end m-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 cursor-pointer"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  onClick={() => {
                    handleMdOpen();
                  }}
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <Link href="/showList나중에 업데이트 하기">
                <a className="modalSpace">컨텐츠 목록</a>
              </Link>
              <Link href="/showList나중에 업데이트 하기">
                <a className="modalSpace">컨텐츠 등록</a>
              </Link>
              <Link href="/users/sign_up">
                <a className="p-3 rounded-lg bg-brown-400 modalSpace">
                  회원 가입
                </a>
              </Link>
              <Link href="/users/sign_in">
                <a className="p-3 mb-5 rounded-lg bg-brown-400 modalSpace">
                  로그인
                </a>
              </Link>
            </div>
          </section>
        </Transition>
      </nav>
    </>
  );
}
