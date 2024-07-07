import { Button } from "@/components/ui/button";
import React from "react";
import { exampleResume } from "@/config/constants";

const ResumeSpace = () => {
  return (
    <div className="relative flex items-center flex-col h-[100%]">
      <div className="absolute top-0 left- 0 flex justify-between px-16 py-2 w-full">
        <span>Template 1 </span>
        <Button className="bg-grad active:scale-90">Create </Button>
      </div>
      <div className="size-full overflow-y-scroll flex justify-center">
        <div className="mt-36 w-[210mm] h-[297mm] bg-white text-gray-500 ">
          <div className="bg-black p-8">
            <h1 className="text-[34pt] font-extrabold text-orange-500">
              {exampleResume?.name}
            </h1>
            <p className="text-lg font-semibold">{exampleResume?.jobProfile}</p>
            <p className="text-sm">
              {exampleResume?.email} | {exampleResume?.phone}{" "}
              {exampleResume?.links?.map((link, index) => (
                <span key={index} className="">
                  | <a href={link.href}>{link.title} </a>
                </span>
              ))}
            </p>
          </div>

          <div className="mt-4 px-8 ">
            <h1 className="text-lg mt-4 border-b-2 border-orange-500 text-orange-500">
              Skills
            </h1>

            <ul className=" flex justify-between">
              {exampleResume?.skills?.map((skill, index) => (
                <div className="flex-[0.33] ">
                  <p className="font-semibold text-black">{skill.label}</p>
                  <span className="text-sm text-wrap">{skill.values}</span>
                </div>
              ))}
            </ul>
            <h1 className="text-lg mt-4 border-b-2  font-bold border-orange-500 text-orange-500">
              Projects
            </h1>
            <ul className=" flex flex-col justify-between">
              {exampleResume?.projects?.map((project: any, index: number) => (
                <div className="mt-4" key={index}>
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
                      {project?.description?.map(
                        (desc: string, index: number) => (
                          <li className="text-sm">{desc}</li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              ))}
            </ul>

            <h1 className="text-lg mt-4 border-b-2 border-orange-500 text-orange-500">
              Education
            </h1>

            <ul className=" flex justify-between w-full">
              {exampleResume?.education?.map((edu: any, index: number) => (
                <li className=" w-full " key={index}>
                  <p className="w-full flex justify-between items-end">
                    <span className="font-semibold text-black">{edu.degree}</span>
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

                  {/* <span className="text-sm text-wrap">{skill.values}</span> */}
                </li>
              ))}
            </ul>

            <h1 className="text-lg mt-4 border-b-2 border-orange-500 text-orange-500">
              Achievements and Certifications
            </h1>

            <ul className=" justify-between w-full">
              {exampleResume?.achievements_Certification?.map(
                (achievement: any, index: number) => (
                  <div className="w-full ">
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
    </div>
  );
};

export default ResumeSpace;
