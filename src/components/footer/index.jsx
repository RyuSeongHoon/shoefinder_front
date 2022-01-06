import React from "react";

export default function footer() {
  return (
    <footer className="flex justify-between py-3 pl-16 pr-20 mt-10 spae-x-0 bg-brown-200">
      <section>
        <div className="mt-3 font-bold text-md">회사정보</div>
        <div className="mt-3">
          <div className="mb-1 text-gray-500 ">
            사업자 등록 번호 310-29-99912
          </div>
          <div className="mb-1 text-gray-500">ShoeFinder</div>
        </div>
      </section>
      <section>
        <div className="mt-3 font-bold text-md">연락처</div>
        <div className="mt-3">
          <div className="mb-1 text-gray-500 ">
            서울특별시 홍대 조던 10-22 3층
          </div>
          <div className="mb-1 text-gray-500 ">010-2039-9202</div>
          <div className="mb-1 text-gray-500 ">
            ryushulang@limitededition.com
          </div>
        </div>
      </section>
      <div className="mt-3 font-bold text-md">이용약관</div>
      <div className="mt-3 font-bold text-md">개인정보처리방침</div>
    </footer>
  );
}
