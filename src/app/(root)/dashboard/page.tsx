"use client";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import {
  getUser,
  getUserFollowers,
  getUserProfile,
  updateUser,
} from "@/config/mongoose/mongoFunction";
import { useCareerMateStore } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import React, { useEffect } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import UtilityImages from "@/components/Dashboard/UtilityImages";

const Dashboard = () => {
  const {
    localUser,
    setLocalUser,
    renderKey,
    updateRenderKey,
    updateUserProfileDb,
  } = useCareerMateStore();
  const { user, isSignedIn } = useUser();
  const [followers, setFollowers] = React.useState([]);
  const [following, setFollowing] = React.useState([]);

  useEffect(() => {
    if (isSignedIn) {
      getUser(user.id)
        .then((data) => {
          if (data.status === 200) {
            setLocalUser(data.data);
            getUserFollowers(data.data._id).then((res) => {
              console.log(res);
              if (res.status === 200) {
                setFollowers(res.data.followers);
                setFollowing(res.data.following);
              }
            });

            if (isSignedIn) {
              let clerkId = user.id;
              let userId: string = String(data.data._id);
              getUserProfile(clerkId, userId).then((data) => {
                console.log(data);
                if (data.status === 200) {
                  updateUserProfileDb(data.data);
                  updateRenderKey();
                }
              });
            }

            updateRenderKey();
          } else if (data.status === 400) {
            toast({
              title: "Error No clerkId provided",
              variant: "error",
            });
          }
        })
        .catch((error) => {
          toast({
            title: error.message,
            variant: "error",
          });
        });
    }
  }, [user]);

  const handleProfileType = () => {
    if (!isSignedIn) return;
    const tempUser = localUser;
    tempUser.profileType =
      localUser.profileType === "Public" ? "Private" : "Public";

    const clerkId: string = String(user.id);
    updateUser(clerkId, tempUser).then((res) => {
      if (res.status === 200) {
        setLocalUser(res.data);
        updateRenderKey();
      }
    });
  };
  return (
    <div key={renderKey} className="px-8">
      <div className="">
        <div className="bg-white px-8 py-2 rounded-lg shadow-lg flex justify-between items-center">
          <span className="text-grad text-lg font-semibold  flex gap-2">
            <span>Add Utility Images</span>
            <span className="hidden md:block">
              to your profile that you want to use in your project or portfolio
            </span>
          </span>
          <UtilityImages />
        </div>
      </div>
      <div className="pt-4 flex justify-between items-center">
        <span>{localUser.userName}</span>
        <span className="flex gap-4 items-center">
          <p>{followers.length} Followers</p>
          <p>{following.length} Following</p>
          <Button className="active:scale-90" onClick={handleProfileType}>
            {localUser.profileType} Account
          </Button>
        </span>
      </div>
    </div>
  );
};

export default Dashboard;
