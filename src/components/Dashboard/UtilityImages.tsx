"use client";
import React, { useEffect, useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "../ui/input";
import { Progress } from "@/components/ui/progress";
import { useCareerMateStore } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import { updateUser } from "@/config/mongoose/mongoFunction";
import { Loader, Trash } from "lucide-react";
import Image from "next/image";
import { toast } from "../ui/use-toast";

const UtilityImages = () => {
  const { localUser, setLocalUser, renderKey, updateRenderKey } =
    useCareerMateStore();

  const { user, isSignedIn } = useUser();
  const [isUploading, setIsUploading] = useState(false);
  const handleImageStore = async (file: any) => {
    setIsUploading(true);
    if (!isSignedIn || !user) {
      console.error("User is not signed in");
      return;
    }

    const formData = new FormData();
    formData.append("file", file[0]);
    formData.append("title", file[0].name);
    formData.append("clerkId", user.id);
    const response = await fetch("/api/cloudinary/image-upload", {
      method: "POST",
      body: formData,
    });

    response.json().then((res) => {
      res.data;

      let tempLocalUser = localUser;
      tempLocalUser.utilityImages.push(res.data);

      updateUser(user.id, tempLocalUser).then((res1) => {
        setLocalUser(res1.data);
        updateRenderKey();
      });
    });
    setIsUploading(false);
  };

  const handleDelete = async (publicId: String, index: Number) => {
    setIsUploading(true);
    let userId = isSignedIn ? user.id : "";

    const res = await fetch("/api/cloudinary/image-delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        publicId,
      }),
    });

    res
      .json()
      .then((data) => {
        if (data.status == 200) {
          let tempLocalUser = localUser;
          tempLocalUser.utilityImages = tempLocalUser.utilityImages.filter(
            (image) => image.publicId !== publicId
          );
          updateUser(userId, tempLocalUser).then((res1) => {
            setLocalUser(res1.data);
            updateRenderKey();
          });
        }
        toast({
          title: data.message,
          variant: data.type,
        });
        setIsUploading(false);
      })
      .catch((e: any) => {
        e.message;
        setIsUploading(false);
        return;
      });
  };
  return (
    <Sheet>
      <SheetTrigger>
        {" "}
        <span className="bg-grad active:scale-90 rounded-md px-4 py-2">
          View
        </span>
      </SheetTrigger>
      <SheetContent side={"right"}>
        <SheetHeader>
          <SheetTitle>
            <Progress
              value={localUser?.utilityImages?.length * 20}
              className="mt-8 mb-4"
            />

            {!isUploading && localUser?.utilityImages?.length < 5 && (
              <Input
                type="file"
                onChange={(event) => {
                  const file = event.target.files;
                  handleImageStore(file);
                }}
              />
            )}
            {localUser?.utilityImages?.length >= 5 && (
              <span className="text-center text-red-500">
                You can only upload 5 images
              </span>
            )}

            {isUploading ? (
              <span className="w-full pb-8 pt-4 flex justify-center">
                <Loader className="size-4 animate-spin text-orange-500 " />
              </span>
            ) : (
              " "
            )}
          </SheetTitle>
          <SheetDescription>
            <span className="w-full h-[60svh] flex flex-col gap-8 mt-8 mb-16 pt-8 overflow-y-scroll justify-start items-center">
              {localUser?.utilityImages?.map((image, index) => (
                <span className="relative " key={index}>
                  <span className="absolute -top-2 -right-2">
                    <Trash
                      className="size-4 active:scale-90 text-red-500"
                      onClick={() => {
                        handleDelete(image.publicId, index);
                      }}
                    />
                  </span>
                  <Image
                    key={index}
                    src={image.url}
                    alt={"image" + index}
                    width={150}
                    height={150}
                    className="rounded-md "
                  />
                </span>
              ))}
            </span>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default UtilityImages;
