import Controls from "@/components/Dashboard/Resume/Controls";
import ResumeSpace from "@/components/Dashboard/Resume/ResumeSpace";
import React from "react";

const page = () => {
  return (
    <section className="flex h-[85vh] overflow-y-hidden">
      <div className="max-[280px] w-[280px] ">
        <Controls />
      </div>
      <div className=" w-full">
        <ResumeSpace />
      </div>
    </section>
  );
};

export default page;
