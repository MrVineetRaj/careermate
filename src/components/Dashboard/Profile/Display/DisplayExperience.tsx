import { user_profile } from "@/config/constants";
import { Pencil, Plus, Trash } from "lucide-react";
import Image from "next/image";
import React from "react";
import EditExperience, {
  AddExperience,
  DeleteOneExperience,
} from "../Edit/EditExperience";
import {
  experienceInterface,
  userProfileInterface,
} from "@/config/TypeScriptTypes";
import { useCareerMateStore } from "@/store/store";

const DisplayExperience = ({
  user_profile,
}: {
  user_profile: userProfileInterface;
}) => {
  const { renderKey, updateRenderKey, setUserProfileActive } =
    useCareerMateStore();
  const addOneExperience = ({
    experience,
  }: {
    experience: experienceInterface;
  }) => {
    let tempProfile = user_profile;
    tempProfile?.experiences.push(experience);
    setUserProfileActive(tempProfile);
    updateRenderKey();
  };

  const deleteOneExperience = ({ index }: { index: number }) => {
    let tempProfile = user_profile;
    tempProfile?.experiences.splice(index, 1);
    setUserProfileActive(tempProfile);
    updateRenderKey();
  };

  const updateOneExperience = ({
    experience,
    index,
  }: {
    experience: experienceInterface;
    index: number;
  }) => {
    let tempProfile = user_profile;
    tempProfile.experiences[index] = experience;
    setUserProfileActive(tempProfile);
    updateRenderKey();
  };

  return (
    <div>
      <h3
        className="text-primary flex justify-between items-center pb-1 border-b border-b-primary pt-16"
        key={renderKey}
      >
        Experience{" "}
        <span>
          <AddExperience addOneExperience={addOneExperience} />
        </span>
      </h3>
      <div className="flex flex-wrap gap-8 ">
        {user_profile?.experiences?.map((experience, index) => (
          <div key={index} className=" flex flex-col ">
            <h3 className="text-base w-full font-bold flex items-start justify-between pt-6">
              <span>{experience?.title}</span>
              <span className="flex gap-2">
                <span>
                  {" "}
                  {experience?.startDate} - {experience?.endDate}
                </span>
                <span className="flex gap-2">
                  <EditExperience
                    updateOneExperience={updateOneExperience}
                    index={index}
                  />
                  <DeleteOneExperience
                    deleteOneExperience={deleteOneExperience}
                    index={index}
                  />
                </span>
              </span>
            </h3>
            <p className="text-sm">
              {experience?.company}, {experience?.location}
            </p>
            <p className="text-sm line-clamp-3">{experience?.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayExperience;
