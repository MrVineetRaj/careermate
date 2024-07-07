import { user_profile } from "@/config/constants";
import { Pencil, Plus, Trash } from "lucide-react";
import React from "react";
import {
  EditEducation,
  AddEducation,
  DeleteEducation,
} from "../Edit/EditEducation";
import {
  educationInterface,
  userProfileInterface,
} from "@/config/TypeScriptTypes";
import { useCareerMateStore } from "@/store/store";

const DisplayEducation = ({
  user_profile,
}: {
  user_profile: userProfileInterface;
}) => {
  const {
    renderKey,
    updateRenderKey,
    setUserProfileActive,
    updateUserProfileDb,
  } = useCareerMateStore();

  const addOneEducation = ({
    education,
  }: {
    education: educationInterface;
  }) => {
    let tempProfile = user_profile;
    tempProfile.education.push(education);
    setUserProfileActive(tempProfile);
    updateRenderKey();
  };

  const editOneEducation = ({
    education,
    index,
  }: {
    education: educationInterface;
    index: number;
  }) => {
    let tempProfile = user_profile;

    tempProfile.education[index] = education;

    setUserProfileActive(tempProfile);
    updateRenderKey();
  };

  const deleteOneEducation = ({ index }: { index: number }) => {
    let tempProfile = user_profile;
    tempProfile.education.splice(index, 1);
    setUserProfileActive(tempProfile);
    updateRenderKey();
  };

  return (
    <div>
      <h3 className="text-primary flex justify-between items-center pb-1 border-b border-b-primary">
        Education{" "}
        <span>
          <AddEducation addOneEducation={addOneEducation} />
        </span>
      </h3>
      <div className="flex flex-col gap-2">
        {user_profile?.education?.map((education, index) => (
          <div key={index}>
            <h3 className="text-lg font-semibold flex items-center justify-between">
              <span className="">
                {education?.degree} -{" "}
                <span className="text-base"> {education?.marks}</span>
              </span>
              <span>
                <span className="flex gap-2">
                  <EditEducation
                    editOneEducation={editOneEducation}
                    index={index}
                  />
                  <DeleteEducation
                    deleteOneEducation={deleteOneEducation}
                    index={index}
                  />
                </span>
              </span>
            </h3>
            <p className="text-sm">
              {education?.institution}, {education?.location}
            </p>
            <p className="text-sm">Graduation Year {education?.endDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayEducation;
