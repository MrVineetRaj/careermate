import React from "react";

const AboutMe = () => {
  return (
    <section id="about" className=" w-full flex flex-col items-center pt-36">
      <div className="w-[90%] md:w-[75%] lg:w-[60%] ">
        <h1 className="text-grad text-5xl w-full text-center pb-6 mb-4">
          About Me
        </h1>
        <div className="flex flex-col gap-2">
          <p className="text-center ">
            I am Vineet Raj, a Computer Science student at NSUT Delhi who knows
            the struggle of standing out in a crowded job market. {"I've"} been
            there, facing those frustrating ATS systems and limited resume
            builders. {"That's"} why I created Career Mate – a tool designed to help
            job seekers like you cut through the noise and make a real impact.
          </p>
          <p className="text-center">
            We use AI to create professional resumes that catch {"recruiters'"}
            attention and get past those pesky ATS filters. Plus, you can build
            an eye-catching online portfolio that showcases your talents and
            projects in a professional way. Easily add clickable links to your
            social profiles, and let your skills shine.
          </p>
          <p className="text-center">
            Career Mate is constantly evolving, and {"I'm"} passionate about making
            it a valuable resource for anyone looking to land their dream job.
            {"Let's"} get started!
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
