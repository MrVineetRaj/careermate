"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { useCareerMateStore } from "@/store/store";
import { UserResumeInterface } from "@/config/TypeScriptTypes";
import { createNewResume } from "@/config/mongoose/mongoFunction";
import { useUser } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { downloadResume } from "@/config/OtherApiCalls";
import { useRouter } from "next/navigation";

const ResumeSpace = () => {
  const { userResume, localUser } = useCareerMateStore();
  const { user, isSignedIn } = useUser();
  const [isCreating, setIsCreating] = React.useState(false);
  const router = useRouter();
  const createResume = async () => {
    setIsCreating(true);
    if (!isSignedIn) {
      return;
    }
    console.log(userResume);
    createNewResume(localUser._id, user.id, userResume)
      .then((data) => {
        downloadResume(
          data.data._id,
          data.data.owner,
          `${data.data.resume.jobProfile}+resume`
        );
      })
      .then(() => {
        setIsCreating(false);
        router.push("/dashboard/create-resume");
      });
  };
  return (
    <div className="relative flex items-center flex-col h-[100%]">
      <div className="absolute top-0 left- 0 flex justify-between px-16 py-2 w-full">
        <span>Template 1 </span>
        <Button className="bg-grad active:scale-90" onClick={createResume}>
          {isCreating ? (
            <span>
              Creating <Loader className="size-4 animate-spin-" />
            </span>
          ) : (
            "Create"
          )}
        </Button>
      </div>
      <div className="size-full overflow-y-scroll flex justify-center">
        <div className="mt-36 w-[210mm] h-[297mm] bg-white text-gray-500 ">
          <div className="bg-black p-8">
            <h1 className="text-[34pt] font-extrabold text-orange-500">
              {userResume?.name}
            </h1>
            <p className="text-lg font-semibold">{userResume?.jobProfile}</p>
            <p className="text-sm">
              {userResume?.email} | {userResume?.phone}{" "}
              {userResume?.links?.map((link: any, index: number) => (
                <span key={index} className="">
                  | <a href={link.href}>{link.title} </a>
                </span>
              ))}
            </p>
          </div>

          <div className="mt-4 px-8 ">
            <h1 className="text-lg mt-4 border-b-2 border-orange-500 text-orange-500">
              Summary
            </h1>
            <ul className=" flex justify-between">
              <p className="text-sm">{userResume?.summary}</p>
            </ul>
          </div>
          <div className="mt-4 px-8 ">
            <h1 className="text-lg mt-4 border-b-2 border-orange-500 text-orange-500">
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
            <h1 className="text-lg mt-4 border-b-2  font-bold border-orange-500 text-orange-500">
              Projects
            </h1>
            <ul className=" flex flex-col justify-between">
              {userResume?.projects?.map((project: any, index: number) => (
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

            <h1 className="text-lg mt-4 border-b-2 border-orange-500 text-orange-500">
              Education
            </h1>

            <ul className=" flex flex-col justify-between w-full">
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

            <h1 className="text-lg mt-4 border-b-2 border-orange-500 text-orange-500">
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
    </div>
  );
};

export default ResumeSpace;
