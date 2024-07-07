import React from "react";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <section
      id="home"
      className="flex w-full min-h-[80vh]  flex-col justify-center items-center px-8 gap-8"
    >
      <h1 className="text-4xl  md:text-5xl lg:text-6xl text-center">
        Unleash Your Impact.{" "}
        <span className="text-grad">Empower Your Career.</span>{" "}
      </h1>
      <h3 className="text-lg md:text-xl lg:text-2xl   text-center w-[60%] md:w-[80%] sm:w-[90%]">
        Our tools help you create a standout profile that showcases your skills
        and experience, unleashing your impact and empowering you to achieve
        your career goals
      </h3>
      <div className="flex gap-4">
        <Button variant="gradient" className="py-4">
          <h3 className="p-8 ">Get Started</h3>
        </Button>
        <Button variant="outline" className="py-4">
          <h3 className="p-8 text-grad">Learn More</h3>
        </Button>
      </div>
    </section>
  );
};

export default Hero;
