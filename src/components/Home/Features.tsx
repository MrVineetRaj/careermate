"use client";
import { features } from "@/config/constants";
import { featureInterface } from "@/config/TypeScriptTypes";
import React from "react";
import { motion } from "framer-motion";
import {
  slideAnimationLeftAndVibrate,
  slideAnimationRightAndVibrate,
} from "@/config/motion";
const FeatureCard = ({ feature }: { feature: featureInterface }) => {
  const alignMent: string = feature.alignment;
  return (
    <div
      className={"flex flex-col gap-4 mt-8 text-left"}
      // style={{ textAlign: alignMent === "left" ? "right" : "left" }}
    >
      <h2 className="text-grad">{feature.title}</h2>
      <p>{feature.description}</p>
    </div>
  );
};

const Features = () => {
  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="w-[90%] md:w-[60vw] flex flex-col md:grid grid-cols-2 gap-4">
        {features.map((feature: featureInterface, index: number) => {
          return (
            <div
              key={index}
              className="relative flex flex-1 flex-col gap-8 w-[full] min-h-[400px] text-left bg-primary/40 py-4 rounded-lg items-start p-4"
              // style={{ textAlign: feature.alignment === "left" ? "right" : "left" }}
              {...(feature.alignment === "left"
                ? slideAnimationLeftAndVibrate
                : slideAnimationRightAndVibrate)}
              // animate={{}}
            >
              <div className=" absolute top-8 left-6 size-8  rounded-full border-2 border-white bg-grad " />
              <div className=" absolute top-0 left-10 h-8  border border-primary bg-grad" />
              <h2 className="text-white text-left mt-16 md:text-4xl">
                {feature.title}
              </h2>
              <p className="text-lg  text-justify md:text-xl font-semibold text-gray-400">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Features;
