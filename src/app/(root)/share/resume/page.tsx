"use client";
import { getUserResume } from "@/config/mongoose/mongoFunction";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const SharedResume = () => {
  const [userResume, setUserResume] = useState({
    name: "",
    jobProfile: "",
    email: "",
    phone: "",
    summary: "",
    links: [],
    skills: [],
    projects: [],
    education: [],
    achievements_Certification: [],
  });
  const searchParams = useSearchParams();
  const resumeId = String(searchParams.get("r"));
  const userId = String(searchParams.get("u"));

  useEffect(() => {
    getUserResume(resumeId, userId).then((data) => {
      setUserResume(data.data.resume);
    });
  }, []);
  return (
    <>
      <p
        className="w-full text-center"
        onClick={() => {
          // get the resume element
          const resumeElement = document.getElementById("resume-to-print");
          if (resumeElement) {
            // clone the resume element
            const clonedResume = resumeElement.cloneNode(true);
            // remove all elements from the page
            document.body.innerHTML = "";
            // add the cloned resume
            document.body.appendChild(clonedResume);
            // print the resume
            window.print();
          } else {
            console.error("Element with ID 'resume-to-print' not found.");
          }
        }}
      >
        print
      </p>
      <div
        className="size-full h-[100vh] overflow-y-scroll flex justify-center"
        id="resume-to-print"
        style={{ scrollbarWidth: "none" }}
      >
        <div className=" w-[210mm] min-h-[297mm] bg-white text-gray-500 ">
          <div className="bg-black p-8">
            <h1 className="text-[34pt] font-extrabold text-orange-500">
              {userResume?.name}
            </h1>
            <p className="text-lg font-semibold mt-2">
              {userResume?.jobProfile}
            </p>
            <p className="text-sm">
              {userResume?.email} | {userResume?.phone}{" "}
              {userResume?.links?.map((link: any, index: number) => (
                <span key={index} className="">
                  | <a href={link.href}>{link.title} </a>
                </span>
              ))}
            </p>
          </div>

          <div className="mt-2 px-8 ">
            <h1 className="text-lg border-b-2 border-orange-500 text-orange-500">
              Summary
            </h1>
            <ul className=" flex justify-between">
              <p className="text-sm">{userResume?.summary}</p>
            </ul>
          </div>

          <div className="mt-2 px-8 ">
            <h1 className="text-lg border-b-2 border-orange-500 text-orange-500">
              Skills
            </h1>

            <ul className=" flex justify-between">
              {userResume?.skills?.map((skill: any, index: number) => (
                <div className="flex-[0.33] " key={index}>
                  <p className="font-semibold text-black">{skill.label}</p>
                  <span className="text-sm text-wrap">{skill.values}</span>
                </div>
              ))}
            </ul>
            <h1 className="text-lg mt-1 border-b-2  font-bold border-orange-500 text-orange-500">
              Projects
            </h1>
            <ul className=" flex flex-col justify-between">
              {userResume?.projects?.map((project: any, index: number) => (
                <div className="mt-2" key={index}>
                  <p className="font-semibold text-black flex justify-between items-start border-b">
                    <span>{project.title}</span>{" "}
                    <span>
                      {project.Github !== "" && project.Github !== "#" && (
                        <a
                          href={project.GitHub}
                          className="text-sm text-wrap text-gray-500"
                        >
                          Github
                        </a>
                      )}{" "}
                      {project.Demo !== "" && project.Demo !== "#" && (
                        <a
                          href={project.Demo}
                          className="text-sm text-wrap text-gray-500"
                        >
                          Demo
                        </a>
                      )}
                    </span>
                  </p>
                  <p className="text-black">
                    Technologies :{" "}
                    <span className="text-sm text-gray-500">
                      {" "}
                      {project.technologies}
                    </span>
                  </p>

                  <div className="">
                    <ul className=" flex flex-col justify-between list-disc px-8">
                      {project?.description?.map((desc: any, index: number) => (
                        <li className="text-sm" key={index}>
                          {desc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </ul>

            <h1 className="text-lg mt-1 border-b-2 border-orange-500 text-orange-500">
              Education
            </h1>

            <ul className=" flex justify-between w-full">
              {userResume?.education?.map((edu: any, index: number) => (
                <li className=" w-full " key={index}>
                  <p className="w-full flex justify-between items-end">
                    <span className="font-semibold text-black">
                      {edu.degree}
                    </span>
                    <span className="text-sm">{edu.marks}</span>
                  </p>
                  <p className=" w-full flex justify-between text-sm">
                    <span>
                      {edu.institution}, {edu.location}
                    </span>
                    <span>
                      {edu.startYear} - {edu.endYear}
                    </span>
                  </p>
                </li>
              ))}
            </ul>

            <h1 className="text-lg mt-1 border-b-2 border-orange-500 text-orange-500">
              Achievements and Certifications
            </h1>

            <ul className=" justify-between w-full">
              {userResume?.achievements_Certification?.map(
                (achievement: any, index: number) => (
                  <div className="w-full " key={index}>
                    <p className="font-semibold text-black">
                      {achievement.title}
                    </p>
                    <span className="text-sm text-wrap">
                      {achievement.description}
                    </span>
                  </div>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SharedResume;
