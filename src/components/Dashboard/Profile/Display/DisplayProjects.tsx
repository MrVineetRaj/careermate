import { user_profile } from "@/config/constants";
import { Pencil, Plus, Trash } from "lucide-react";
import Image from "next/image";
import React from "react";
import EditProject, { AddProject } from "../Edit/EditProject";
import {
  projectInterface,
  userProfileInterface,
} from "@/config/TypeScriptTypes";
import { useCareerMateStore } from "@/store/store";
import { toast } from "@/components/ui/use-toast";

const DisplayProjects = ({
  user_profile,
}: {
  user_profile: userProfileInterface;
}) => {
  const { updateUserProfileDb, setUserProfileActive } = useCareerMateStore();
  const addNewProject = (project: projectInterface) => {
    const tempProfile = user_profile;
    tempProfile.projects.push(project);
    setUserProfileActive(tempProfile);
    toast({
      title: "Please click on save button to save changes",
      variant: "warning",
    });
  };
  return (
    <div>
      <h3 className="text-primary flex justify-between items-center pb-1 border-b border-b-primary">
        Projects{" "}
        <span className="hidden lg:block text-sm text-orange-500">
          to change the image of project delete the project and create new
          project
        </span>
        <span>
          <AddProject addOneProject={addNewProject} />
        </span>
      </h3>
      <div className="flex flex-wrap gap-8 ">
        {user_profile?.projects?.map((project, index) => (
          <div
            key={index}
            className="relative w-full max-w-[300px] md:w-1/2 lg:w-1/3 flex flex-col  items-center justify-between pt-6"
          >
            <span className="absolute top-0 right-0 flex gap-2">
              <EditProject />
              <Trash className="text-red-500 w-4 cursor-pointer active:scale-90" />
            </span>
            <Image
              className="w-full h-auto rounded-md"
              src={project?.imageUrl}
              alt={project?.title}
              width={200}
              height={200}
            />
            <h3 className="text-base w-full font-bold flex items-start justify-between gap-2">
              <span>
                {project?.title}{" "}
                <span className="text-gray-500 flex gap-2 ">
                  <a
                    href={project?.GitHub || "#"}
                    target="_blank"
                    className="hover:text-primary"
                  >
                    Github
                  </a>
                  <a
                    href={project?.Demo || "#"}
                    target="_blank"
                    className="hover:text-primary"
                  >
                    Demo
                  </a>
                </span>
              </span>
            </h3>
            <p className="text-sm line-clamp-3">{project?.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayProjects;
