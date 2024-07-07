"use client";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { getUser } from "@/config/mongoose/mongoFunction";
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
  const { localUser, setLocalUser, renderKey, updateRenderKey } =
    useCareerMateStore();
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    if (isSignedIn) {
      getUser(user.id)
        .then((data) => {
          if (data.status === 200) {
            setLocalUser(data.data);
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
  return (
    <div key={renderKey}>
      <div className="px-8">
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
    </div>
  );
};

export default Dashboard;
