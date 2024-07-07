"use client";

import {
  DisplayAchievements,
  DisplayContacts,
  DisplayEducation,
  DisplayExperience,
  DisplayProjects,
  DisplaySkills,
} from "@/components/Dashboard/Profile/Display/index";
import { Button } from "@/components/ui/button";
import { user_profile } from "@/config/constants";
import {
  getUserProfile,
  updateUserProfile,
} from "@/config/mongoose/mongoFunction";
import { userProfileInterface } from "@/config/TypeScriptTypes";
import { useCareerMateStore } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Profile = () => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const [isSaving, setIsSaving] = useState(false);
  const {
    user_profile_active,
    setUserProfileActive,
    user_profile_db,
    setUserProfileDB,
    updateUserProfileDb,
    updateRenderKey,
  } = useCareerMateStore();
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    if (!isSignedIn) {
      return;
    }
    if (isSignedIn) {
      let clerkId = user.id;
      let userId: string = String(searchParams.get("r"));
      getUserProfile(clerkId, userId).then((data) => {
        console.log(data);
        if (data.status === 200) {
          updateUserProfileDb(data.data);
          updateRenderKey();
        }
      });
    }
  }, [pathName, user]);

  const handleSave = () => {
    setIsSaving(true);
    const clerkId: string = isSignedIn ? user.id : "";
    const userId: string = String(searchParams.get("r"));
    const data: userProfileInterface = user_profile_db;

    updateUserProfile(clerkId, userId, data)
      .then((data) => {
        if (data.status === 200) {
          updateUserProfileDb(data.data);
          setIsSaving(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsSaving(false);
      });
  };
  return (
    <section className="px-4 sm:px-8 lg:px-16 h-[100svh] overflow-y-scroll">
      <h1 className="text-grad mb-16 pb-2 border-b-2 border-primary flex justify-between items-center">
        <span>Profile</span>
        <Button className="bg-grad active:scale-90" onClick={handleSave}>
          {isSaving ? <Loader className="animate-spin size-4" /> : "Save"}
        </Button>
      </h1>

      <div className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-36">
        <div className="">
          <DisplayContacts user_profile={user_profile_active} />
        </div>
        <div className="">
          <DisplaySkills user_profile={user_profile_active} />
        </div>
        <div className=" col-span-1 md:col-span-2 xl:col-span-1">
          <DisplayEducation user_profile={user_profile_active} />
        </div>
        <div className=" col-span-1 md:col-span-2 xl:col-span-3 mt-6">
          <DisplayProjects user_profile={user_profile_active} />
        </div>
        <div className=" col-span-1 md:col-span-2 xl:col-span-3 mt-6">
          <DisplayExperience user_profile={user_profile_active} />
        </div>
        <div className=" col-span-1 md:col-span-2 xl:col-span-3 mt-6">
          <DisplayAchievements user_profile={user_profile_active} />
        </div>
      </div>
    </section>
  );
};

export default Profile;
