import Header from "../../src/components/header";
import Footer from "../../src/components/Footer";

const Welcome = () => {
  return (
    <main>
      <Header />
      <section className="flex flex-col ml-24 ">
        <div className="text-2xl">
          Welcome! ShoeFinder의 회원이 되신것을 축하드립니다!
        </div>
        <div className="mt-5 text-3xl leading-10">
          *회원가입 시 사용한 이메일로 회원확인 링크가 발송되었습니다
          <p className="font-bold">
            발송된 링크를 클릭하면 유저확인이 완료되며
          </p>
          회원가입이 완료됩니다
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Welcome;
