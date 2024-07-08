"use client";

import { Loader, Plus, Share2 } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
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
import { toast, useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useCareerMateStore } from "@/store/store";
import { prompt } from "@/config/constants";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import {
  createNewPortfolio,
  getUserPortfolio,
} from "@/config/mongoose/mongoFunction";
import { useRouter } from "next/navigation";

const CreatePortfolio = () => {
  const [jobProfile, setJobProfile] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const { localUser, user_profile_db } = useCareerMateStore();
  const [portfolio, setPortfolio] = useState({
    jobProfile: "",
  });
  const router = useRouter();

  useEffect(() => {
    if (!localUser._id) {
      router.push("/dashboard");
    } else if (user_profile_db === null) {
      router.push("/dashboard/profile");
    } else {
      getUserPortfolio(localUser._id).then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setPortfolio(res.data.portfolio);
        }
      });
    }
  }, [localUser._id]);

  const createPortfolio = async () => {
    setIsGenerating(true);
    if (jobProfile === "") {
      toast({
        title: "Job Profile is required",
        variant: "error",
      });
      return;
    }

    if (imageUrl === "") {
      toast({
        title: "Image is required",
        variant: "error",
      });
      return;
    }
    const userPrompt = `for ${jobProfile} and user image ${imageUrl} create a json file using data ${JSON.stringify(
      user_profile_db
    )} ${prompt.portfolio}`;

    const response = await fetch("/api/ai-model", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: userPrompt }),
    });

    if (response.ok) {
      const data = await response.json();
      let dataObj = JSON.parse(data.data);
      createNewPortfolio(localUser._id, localUser.clerkId, dataObj).then(
        (response) => {
          toast({
            title: response.message,
            variant: response.type,
          });
          router.push("/portfolio?u=" + localUser._id);
        }
      );
      setIsGenerating(false);
    } else {
      const errorData = await response.json();
      console.error("Error generating Portfolio:", errorData.error);
      setIsGenerating(false);
    }
  };
  return (
    <section className="px-4 sm:px-8 lg:px-16 h-[100svh] overflow-y-scroll ">
      <h1 className="text-grad mb-2 pb-2 border-b-2 border-primary">
        Create Portfolio
      </h1>
      <div className="bg-white px-8 py-4 rounded-lg shadow-lg">
        <Link
          href="/dashboard/profile"
          className="text-grad text-lg font-semibold mb-4"
        >
          Complete Your Profile before creating a Portfolio
        </Link>
      </div>
      <div className=" flex flex-wrap gap-4 mb-36 mt-6 justify-center">
        {portfolio.jobProfile === "" ? (
          <AlertDialog>
            <AlertDialogTrigger>
              <span className="flex w-[200px] h-[250px] rounded-lg  bg-white/10 justify-center items-center cursor-pointer active:scale-90 transition duration-150 active:bg-white/5">
                <Plus className="w-20 h-20" />
              </span>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Enter Job Profile and select your profile picture
                </AlertDialogTitle>
                <AlertDialogDescription>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-md text-black"
                    placeholder="Job Profile *"
                    onChange={(e) => setJobProfile(e.target.value)}
                  />
                  <Select onValueChange={(value) => setImageUrl(value)}>
                    <SelectTrigger className="w-full overflow-hidden bg-white my-4 flex justify-center">
                      <SelectValue
                        placeholder="Theme"
                        className="overflow-hidden bg-white"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {localUser?.utilityImages?.map((image, index) => (
                        <SelectItem value={`${image.url}`} key={index}>
                          <Image
                            src={`${image.url}`}
                            alt="image"
                            width={200}
                            height={200}
                          />
                        </SelectItem>
                      ))}
                    </SelectContent>
                    {imageUrl && (
                      <img
                        src={`${imageUrl}`}
                        alt="image"
                        className="w-full h-auto mt-4"
                      />
                    )}
                  </Select>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                {isGenerating ? (
                  <span>
                    Generating <Loader className="size-4 animate-spin" />
                  </span>
                ) : (
                  <span>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button onClick={createPortfolio}>Continue</Button>
                  </span>
                )}
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          <span className="relative selection:flex w-[200px] h-[250px] rounded-lg  bg-white/10 justify-center items-center cursor-pointer transition duration-150 active:bg-white/5">
            <span className="absolute -top-2 -right-2 flex items-center gap-4">
              <Share2
                className="size-4  active:scale-90"
                onClick={() => {
                  window.open("/share/portfolio?u=" + localUser._id, "_blank");
                }}
              />
            </span>
            {portfolio?.jobProfile}
          </span>
        )}
      </div>
    </section>
  );
};

export default CreatePortfolio;
