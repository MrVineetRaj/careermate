"use client";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import {
  getSuggestions,
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
  const [suggestions, setSuggestions] = React.useState([
    {
      source: "",
      _id: "",
      newSuggestion: {
        newSkills: [],
        freeResources: [],
        projectIdea: "",
        description: "",
        roadMap: [
          {
            step: "",
            description: "",
          },
        ],
      },
    },
  ]);

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
              getUserProfile(clerkId, userId).then(async (data) => {
                if (data.status === 200) {
                  updateUserProfileDb(data.data);
                  updateRenderKey();
                  getSuggestions(clerkId, "").then((res) => {
                    if (res.status === 200) {
                      setSuggestions(res.data);
                    }
                  });
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

      <div className="">
        <h1 className="text-grad">Suggestions</h1>

        {suggestions.length > 0 &&
          suggestions.map((suggestion, index) => (
            <div className="mb-4 " key={index}>
              <Sheet >
                <SheetTrigger>
                  <span className="active:scale-90 text-left">
                    {suggestion?.newSuggestion?.projectIdea}
                  </span>
                </SheetTrigger>
                <SheetContent
                  side={"right"}
                  className="h-[100svh] overflow-y-scroll"
                >
                  <SheetHeader>
                    <SheetTitle>Suggestion</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-4 font-thin text-sm">
                    <span>
                      {" "}
                      <span className="font-bold text-base">Idea{" : "}</span>
                      {suggestion?.newSuggestion?.projectIdea}
                    </span>

                    <span>
                      <span className="font-bold  text-base">Skill{" : "}</span>
                      {suggestion?.newSuggestion?.newSkills.join(", ")}
                    </span>
                    <span>
                      <span className="font-bold  text-base">
                        Resources{" : "}
                      </span>
                      {suggestion?.newSuggestion?.freeResources.join(", ")}
                    </span>
                    <span>
                      <span className="font-bold  text-base">
                        Description{" : "}
                      </span>
                      {suggestion?.newSuggestion?.description}
                    </span>
                    {/* <span>{suggestion?.newSuggestion?.roadMap}</span> */}
                    <span className="font-bold  text-base">Roadmap{" : "}</span>

                    {suggestion?.newSuggestion?.roadMap?.map((road, index) => (
                      <span
                        key={index}
                        className="flex flex-col gap-2 mb-2 py-0"
                      >
                        <span>
                          {" "}
                          <span className="font-bold">
                            Step {index + 1 + " : "}
                          </span>{" "}
                          {road.step}
                        </span>
                        <span>
                          <span className="font-bold">Descriptin :</span>{" "}
                          {road.description}
                        </span>
                      </span>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
