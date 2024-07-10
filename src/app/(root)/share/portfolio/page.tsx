"use client";
import React, { useEffect, useState } from "react";

import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import {
  getUserFollowers,
  getUserPortfolio,
  handleFollow,
} from "@/config/mongoose/mongoFunction";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { toast } from "@/components/ui/use-toast";
import { useCareerMateStore } from "@/store/store";
const Portfolio = () => {
  const { user, isSignedIn } = useUser();
  const searchParams = useSearchParams();
  const router = useRouter();

  const userId: string = String(searchParams.get("u"));
  const [userPortfolio, setUserPortfolio] = useState({
    name: "",
    jobProfile: "",
    summary: "",
    Contact: {
      email: "",
      links: [
        {
          href: "",
          title: "",
        },
      ],
    },
    imageUrl: "",
    about: "",
    skills: [
      {
        label: "",
        values: "",
      },
    ],
    experiences: [
      {
        title: "",
        startYear: "",
        endYear: "",
        company: "",
        location: "",
        description: [""],
      },
    ],
    projects: [
      {
        title: "",
        technologies: "",
        description: [""],
        imageUrl: "",
        Github: "",
        Demo: "",
      },
    ],
    education: [
      {
        degree: "",
        startYear: "",
        endYear: "",
        institution: "",
        location: "",
        marks: "",
      },
    ],
    achievements_certification: [
      {
        title: "",
        description: "",
      },
    ],
  });

  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const { renderKey, updateRenderKey } = useCareerMateStore();
  useEffect(() => {
    getUserPortfolio(userId).then((data) => {
      setUserPortfolio(data.data.portfolio);
      
    });
    getUserFollowers(userId).then((data) => {
      
      setFollowers(data.data.followers);
      setFollowing(data.data.following);
    });
  }, [userId]);

  const handleFollowClient = async () => {
    if (!isSignedIn) {
      toast({
        title: "Please Sign In to Follow ",
        variant: "error",
      });
      router.push("/sign-in?redirect=/share/portfolio?u=" + userId);
      return;
    }
    const data = {
      email: user.emailAddresses[0].emailAddress,
      userId: user.id,
      userName: user.emailAddresses[0].emailAddress.split("@")[0],
      imageUrl: user.imageUrl,
      ownerId: userId,
    };
    handleFollow(data).then((response) => {
      if (response.type === "success") {
        updateRenderKey();
        
      }
      toast({
        title: response.message,
        variant: response.type,
      });
    });
  };

  return (
    <section
      className="h-[100vh] overflow-scroll pb-36 flex flex-col  items-center px-4 sm:px-8 lg:px-16"
      style={{ scrollbarWidth: "thin" }}
      key={renderKey}
    >
      <div className="flex w-[90%] md:w-[80%] xl:w-[75%]  min-h-[70vh] justify-around items-center gap-20 ">
        <div className="">
          <h1 className="text-5xl ">
            👋 Hey ! Am{" "}
            <span className="text-grad ">{userPortfolio?.name}</span>
          </h1>
          <h3 className="mt-4">
            Welcome to the Portfolio of{" "}
            <span className="text-grad">{userPortfolio?.jobProfile}</span>
          </h3>
          <p className="mt-4">{userPortfolio?.summary}</p>
          <div className="flex gap-2 mt-4">
            <p>{userPortfolio?.Contact?.email} </p>
            {userPortfolio?.Contact?.links?.map((link, index) => (
              <a href={link?.href} key={index}>
                {" "}
                | {link?.title}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <span className="flex gap-4">
              <p className="flex gap-2 items-center">
                <User className="size-5" />
                {followers.length} followers
              </p>
              <p className="flex gap-2 items-center">
                <User className="size-5" />
                {following.length} following
              </p>
            </span>

            <Button
              className="bg-grad active:scale-90 max-w-[150px]"
              onClick={() => {
                handleFollowClient();
              }}
            >
              Follow
            </Button>
          </div>
        </div>
        <div className="">
          <img
            src={userPortfolio?.imageUrl}
            alt={userPortfolio?.name}
            className="rounded-full size-30"
          />
        </div>
      </div>
      <div className="flex flex-col w-[90%] md:w-[80%] xl:w-[75%]  items-center">
        <h1 className="text-5xl text-grad w-full text-left mt-24 mb-4 border-b-primary border-b">
          About Me
        </h1>
        <p className="text-left italic">{userPortfolio?.about}</p>
      </div>
      <div className="flex flex-col w-[90%] md:w-[80%] xl:w-[75%]   items-start mt-16">
        <h1 className="text-5xl text-grad w-full text-left mt-24 mb-4 border-b-primary border-b">
          {"What's"} in my Sleeve
        </h1>
        <ul className=" list-inside mt-4">
          {userPortfolio?.skills.map((skill, index) => (
            <li key={index}>
              <h3>{skill.label}</h3>
              <p>{skill.values}</p>
            </li>
          ))}
        </ul>
      </div>
      {userPortfolio?.experiences &&
        userPortfolio?.experiences.length !== 0 && (
          <div className="flex flex-col w-[90%] md:w-[80%] xl:w-[75%]   items-start ">
            <h1 className="text-5xl text-grad w-full text-left mt-24 mb-16 border-b-primary border-b">
              Experience
            </h1>
            <div className="border-l-2 border-l-primary w-full flex flex-col gap-16">
              {userPortfolio?.experiences.map((experience, index) => (
                <div
                  key={index}
                  className="relative flex flex-col gap-2  px-8 py-4"
                >
                  <div className="absolute -top-4 -left-2 size-4 bg-grad rounded-full"></div>
                  <h2 className="text-2xl flex justify-between items-start">
                    {" "}
                    <span className="text-grad">{experience?.title} </span>{" "}
                    <span className="text-xl">
                      {experience?.startYear} - {experience?.endYear}
                    </span>
                  </h2>
                  <span className="text-xl">
                    {experience?.company}, {experience?.location}
                  </span>
                  <h3 className="text-2xl text-grad"></h3>
                  <span className="flex flex-col gap-0.5">
                    {experience?.description?.map((desc, index) => (
                      <p key={index}>{desc}</p>
                    ))}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      {userPortfolio?.projects && userPortfolio?.projects.length !== 0 && (
        <div className="flex flex-col w-[90%] md:w-[80%] xl:w-[75%]   items-start ">
          <h1 className="text-5xl text-grad w-full text-left mt-24 mb-16 border-b-primary border-b">
            Projects
          </h1>
          <div className="border-l-2 border-l-primary w-full flex flex-col gap-16">
            {userPortfolio?.projects?.map((project, index) => (
              <div
                key={index}
                className="relative flex flex-col gap-2  px-8 py-4"
              >
                <div className="absolute -top-4 -left-2 size-4 bg-grad rounded-full"></div>
                <div className="flex gap-2">
                  <div className="flex-[0.5]">
                    <h2 className="text-2xl flex justify-between items-start">
                      {" "}
                      <span className="text-grad">{project?.title} </span>{" "}
                    </h2>
                    <span className="text-xl font-bold">
                      Technologies : {project?.technologies}
                    </span>
                    <h3 className="text-2xl text-grad"></h3>
                    <span className="flex flex-col gap-0.5">
                      {project?.description?.map((desc, index) => (
                        <p key={index}>{desc}</p>
                      ))}
                    </span>
                  </div>
                  <div className="flex-[0.5]">
                    <img
                      src={project?.imageUrl}
                      alt={project?.title}
                      className="size-full"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {userPortfolio?.education && (
        <div className="flex flex-col w-[90%] md:w-[80%] xl:w-[75%]   items-start ">
          <h1 className="text-5xl text-grad w-full text-left mt-24 mb-16 border-b-primary border-b">
            Education
          </h1>
          <div className="border-l-2 border-l-primary w-full flex flex-col gap-16">
            {userPortfolio?.education?.map((edu, index) => (
              <div
                key={index}
                className="relative flex flex-col gap-2  px-8 py-4"
              >
                <div className="absolute -top-4 -left-2 size-4 bg-grad rounded-full"></div>
                <div className="">
                  <div className="">
                    <h2 className="text-2xl flex justify-between items-start">
                      {" "}
                      <span className="text-grad">{edu?.degree} </span>{" "}
                      <span className="text-xl">
                        {edu?.startYear} - {edu?.endYear}
                      </span>
                    </h2>
                    <h3 className="text-2xl text-grad"></h3>
                    <span className="flex  gap-0.5 justify-between">
                      <p>
                        {edu?.institution}, {edu?.location}
                      </p>
                      <p>{edu?.marks}</p>
                    </span>
                  </div>
                  <div className="">
                    {/* <Image src={experience?.imageUrl} alt={experience?.title} /> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {userPortfolio?.achievements_certification && (
        <div className="flex flex-col w-[90%] md:w-[80%] xl:w-[75%]   items-start ">
          <h1 className="text-5xl text-grad w-full text-left mt-24 mb-16 border-b-primary border-b">
            Achievements and Certification
          </h1>
          <div className="border-l-2 border-l-primary w-full flex flex-col gap-16">
            {userPortfolio?.achievements_certification?.map((item, index) => (
              <div
                key={index}
                className="relative flex flex-col gap-2  px-8 py-4"
              >
                <div className="absolute -top-4 -left-2 size-4 bg-grad rounded-full"></div>
                <div className="">
                  <div className="">
                    <span className=" flex gap-4 items-end">
                      {" "}
                      <span className="text-grad text-2xl font-bold">
                        {item?.title}{" "}
                      </span>{" "}
                      <span>{item?.description}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
