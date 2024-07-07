import { user_profile } from "@/config/constants";
import { Pencil, Plus, Trash } from "lucide-react";
import React from "react";
import EditAchievement, {
  AddAchievements,
  DeleteAchievement,
} from "../Edit/EditAchievements";
import { userProfileInterface } from "@/config/TypeScriptTypes";
import { useCareerMateStore } from "@/store/store";

const DisplayAchievements = ({
  user_profile,
}: {
  user_profile: userProfileInterface;
}) => {
  const { renderKey, updateRenderKey, setUserProfileActive } =
    useCareerMateStore();

  const addNewAchievement = ({
    achievement,
  }: {
    achievement: { title: string; description: string };
  }) => {
    let tempProfile = user_profile;
    tempProfile?.achievements_Certification.push(achievement);
    setUserProfileActive(tempProfile);
    updateRenderKey();
  };

  const deleteOneAchievement = ({ index }: { index: number }) => {
    let tempProfile = user_profile;
    tempProfile?.achievements_Certification.splice(index, 1);
    setUserProfileActive(tempProfile);
    updateRenderKey();
  };

  const updateOneAchievement = ({
    achievement,
    index,
  }: {
    achievement: { title: string; description: string };
    index: number;
  }) => {
    let tempProfile = user_profile;
    tempProfile.achievements_Certification[index] = achievement;
    setUserProfileActive(tempProfile);
    updateRenderKey();
  };

  return (
    <div key={renderKey}>
      <h3 className="text-primary flex justify-between items-center pb-1 border-b border-b-primary pt-16">
        Achievements and certification{" "}
        <span>
          <AddAchievements addNewAchievement={addNewAchievement} />
        </span>
      </h3>
      <div className="flex flex-wrap gap-8 ">
        {user_profile?.achievements_Certification?.map((item, index) => (
          <div key={index} className=" flex flex-col ">
            <h3 className="text-base w-full font-bold flex items-start justify-between pt-6">
              <span>{item?.title}</span>
              <span className="flex gap-2">
                <EditAchievement
                  updateOneAchievement={updateOneAchievement}
                  index={index}
                  item={item}
                />
                <DeleteAchievement
                  deleteOneAchievement={deleteOneAchievement}
                  index={index}
                />
              </span>
            </h3>
            <p className="text-sm line-clamp-3">{item?.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayAchievements;
