/* eslint-disable @next/next/no-img-element */
import Image from "next/image";

const ContentCard = ({ content }) => {
  return (
    <div className="p-4">
      <div className="relative h-full overflow-hidden border-2 border-gray-200 rounded-lg border-opacity-60">
        <img
          //   className={`lg:h-48 md:h-36 w-full object-cover object-center border-b
          //   ${content.image ? "" : "p-15"}`}
          src=""
          // {content.image} 나중에 이걸로 써
          alt="thumbnail"
        />
        <div className="p-6">
          <h1 className="title-font text-lg font-medium text-gray-900 mb-3 h-10 overflow-hidden overflow-ellipsis truncate ...">
            {/* {content.shoe_name} */}
          </h1>
          <div className="flex justify-between py-1 pr-3 ml-auto text-sm leading-none border-gray-200 lg:ml-auto md:ml-0">
            <div className="text-gray-400">브랜드</div>
            {/* <div>{content.shoe_brand}</div> */}
          </div>
          <div className="flex justify-between py-1 pr-3 ml-auto text-sm leading-none border-gray-200 lg:ml-auto md:ml-0">
            <div className="text-gray-400">사이즈</div>
            {/* <div>{content.shoe_size}</div> */}
          </div>
          <div className="flex justify-between py-1 pr-3 ml-auto text-sm leading-none border-gray-200 lg:ml-auto md:ml-0">
            <div className="text-gray-400">색상</div>
            {/* <div>{content.shoe_color}</div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
