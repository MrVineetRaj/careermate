import { user_profile } from "@/config/constants";
import { Pencil, Plus, Trash } from "lucide-react";
import React, { useEffect } from "react";
import EditSkill, { AddNewSkill } from "../Edit/EditSkills";
import { userProfileInterface } from "@/config/TypeScriptTypes";
import { useCareerMateStore } from "@/store/store";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const DisplaySkills = ({
  user_profile,
}: {
  user_profile: userProfileInterface;
}) => {
  const { renderKey, updateRenderKey, setUserProfileActive } =
    useCareerMateStore();

  const handleDeleteSkill = ({ label }: { label: string }) => {
    let tempUserProfile = user_profile;
    let tempSkills = tempUserProfile?.skills?.filter(
      (skill) => skill.label !== label
    );
    tempUserProfile.skills = tempSkills;
    setUserProfileActive(tempUserProfile);
    updateRenderKey();
  };

  const handleAddSkill = ({
    label,
    values,
  }: {
    label: string;
    values: string;
  }) => {
    let tempProfile = user_profile;
    tempProfile.skills.push({
      label,
      values,
    });

    setUserProfileActive(tempProfile);
    updateRenderKey();
  };

  const handleEditSkill = {
    
  };
  return (
    <div className="px-2" key={renderKey}>
      <h3 className="text-primary flex justify-between items-center pb-1 border-b border-b-primary">
        Skills{" "}
        <span>
          <AddNewSkill handleAddSkill={handleAddSkill} />
        </span>
      </h3>

      <div className="">
        <span className="flex flex-col gap-2 mt-4">
          {user_profile?.skills?.map((skill, index) => (
            <span
              key={index}
              className="text-sm rounded-md  transition-all flex flex-col gap-1"
            >
              <span className="font-bold border-b pb-1 border-white flex justify-between items-start ">
                {skill?.label}
                <span>
                  <span className="flex gap-2">
                    <EditSkill />
                    <DeleteSkill
                      handleDeleteSkill={handleDeleteSkill}
                      title={skill.label}
                    />
                  </span>
                </span>
              </span>
              <span>{skill?.values}</span>
            </span>
          ))}
        </span>
      </div>
    </div>
  );
};

const DeleteSkill = ({
  handleDeleteSkill,
  title,
}: {
  handleDeleteSkill: ({ label }: { label: string }) => void;
  title: string;
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Trash className="text-red-500 w-4 cursor-pointer active:scale-90" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              handleDeleteSkill({ label: title });
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DisplaySkills;
