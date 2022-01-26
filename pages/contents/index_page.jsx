// import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";
import { getInfiniteContents } from "../../src/common/api";
import ContentCard from "../../src/components/contents";
import Header from "../../src/components/header";
import Footer from "../../src/components/footer";
import React, { useEffect } from "react";
import { subIdSelector } from "../../src/common/selectors";
import { useRecoilState } from "recoil";

const ContentIndexPage = () => {
  const [sub, setSub] = useRecoilState(subIdSelector);
  console.log("sub타입", typeof sub);

  const Content_info_key = "contents/infinite";
  const {
    data,
    hasNextPage,
    fetchNextPage,
    refetch,
    isFetchingNextPage,
    isFetching,
  } = useInfiniteQuery(Content_info_key, getInfiniteContents(sub), {
    getNextPageParam: (lastPage) => lastPage.next_cursor,
  });

  console.log("data", data);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <main className="main">
      <Header />
      {data.pages[0].length > 0 ? (
        <div className="w-full py-12 mx-auto mb-20 divide-y-2 divide-gray-200 lg:max-w-5xl">
          <div className="grid grid-cols-1 gap-2 mb-4 md:grid-cols-2">
            {data &&
              data.pages[0].map((content, idx) => (
                <React.Fragment key={idx}>
                  <ContentCard key={content.id} content={content} />
                </React.Fragment>
              ))}

            <div>
              {isFetching && !isFetchingNextPage ? "Fetching..." : null}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center h-100 py-60">
          <div className="align-middle">
            <h1 className="text-3xl font-bold text-gray-600">
              등록된 컨텐츠가 없습니다
            </h1>
            <p className="mt-2 text-base text-gray-400">
              새로운 컨텐츠를 등록한 후 서비스를 이용해보세요
            </p>
          </div>
        </div>
      )}
      <Footer />
    </main>
  );
};

export default ContentIndexPage;
