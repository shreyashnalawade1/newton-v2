"use client";
import PaperCard from "@/components/shared/PaperCard";
import React, { useEffect, useState } from "react";

import { getFeedPaper } from "@/lib/services/feedUtil";
import BadgeContainer from "@/components/shared/BadgeContainer";

export default function Home(pro) {
  const [data, setData] = useState();

  const [tagFilter, setTagFIlter] = useState("blank");
  console.log(pro);
  useEffect(() => {
    (async () => {
      const data = await getFeedPaper(tagFilter);
      setData(data);
    })();
  }, [tagFilter]);
  const handleTagFilter = (filter) => {
    setTagFIlter(filter);
  };
  return (
    <div className=" flex-grow flex flex-row justify-center overflow-hidden">
      {/* feed contianer */}
      <div className="w-full md:w-3/5 h-full border-r-2 border-r-slate-200 px-5 pt-3 flex flex-col">
        <h1 className="border-b-2 border-b-slate-200 px-6 ">Feed</h1>
        <div className="flex-grow overflow-y-scroll  scrollbar-hide ">
          {data &&
            [...data].map((el) => <PaperCard data={el} key={data?._id} />)}
        </div>
      </div>
      {/* sidebar */}

      <div className="w-3/12 h-full hidden  md:grid md:grid-rows-1">
        <div className="px-5 pt-3 text-sm overflow-hidden    h-full">
          <h3>Trending Topics</h3>
          <div className="flex flex-wrap gap-2 text-xs pt-2  ">
            <BadgeContainer handleTagFilter={handleTagFilter}></BadgeContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
