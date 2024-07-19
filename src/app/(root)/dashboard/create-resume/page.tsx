"use client";
import { Download, Loader, Plus, Share, Share2, ShareIcon } from "lucide-react";
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
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useCareerMateStore } from "@/store/store";
import { prompt } from "@/config/constants";
import { useRouter } from "next/navigation";
import { getUserResume } from "@/config/mongoose/mongoFunction";
import { downloadResume } from "@/config/OtherApiCalls";

const CreateResume = () => {
  const { toast } = useToast();
  const [jobProfile, setJobProfile] = useState("");
  const [companyName, setCompanyName] = useState("");
  const {
    user_profile_db,
    setUserResume,
    localUser,
    renderKey,
    updateRenderKey,
    userSuggestions,
    setUserSuggestions,
  } = useCareerMateStore();
  const [isGenerating, setIsGenerating] = useState(false);
  const router = useRouter();
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    if (!localUser._id) {
      router.push("/dashboard");
    } else if (user_profile_db === null) {
      router.push("/dashboard/profile");
    } else {
      getUserResume("", localUser._id).then((res) => {
        console.log(res);
        console.log(localUser._id);
        if (res.status === 200) {
          setResumes(res.data);
          console.log(res.data);
          updateRenderKey();
        }
      });
    }
  }, [localUser._id]);
  const createResume = async () => {
    setIsGenerating(true);
    if (jobProfile === "") {
      toast({
        title: "Job Profile is required",
        variant: "error",
      });
      return;
    }
    const userPrompt = `for ${jobProfile} and ${companyName} create a resume using data ${JSON.stringify(
      user_profile_db
    )} ${prompt.resume}`;
    try {
      const res = await fetch("/api/ai-model", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: userPrompt,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        toast({
          title: data.message,
          variant: data.type,
        });

        const finalResult = JSON.parse(data.data);

        console.log(finalResult["resume"]);
        // console.log(finalResult["suggestion"]);
        setUserResume(finalResult["resume"]);
        setUserSuggestions(finalResult["suggestion"]);
        router.push("/dashboard/create-resume/edit?r=" + localUser._id);
        setIsGenerating(false);
      }
    } catch (error: any) {
      console.error(error.message);
      setIsGenerating(false);
    }
  };
  return (
    <section
      className="px-4 sm:px-8 lg:px-16 h-[100svh] overflow-y-scroll "
      key={renderKey}
    >
      <h1 className="text-grad mb-2 pb-2 border-b-2 border-primary">
        Create Resume
      </h1>

      <div className="bg-white px-8 py-4 rounded-lg shadow-lg">
        <Link
          href="/dashboard/profile"
          className="text-grad text-lg font-semibold mb-4"
        >
          Complete Your Profile before creating a resume
        </Link>
      </div>

      <div className=" flex flex-wrap gap-4 mb-36 mt-6 justify-center">
        <AlertDialog>
          <AlertDialogTrigger>
            <span className="flex w-[200px] h-[250px] rounded-lg  bg-white/10 justify-center items-center cursor-pointer active:scale-90 transition duration-150 active:bg-white/5">
              <Plus className="w-20 h-20" />
            </span>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Enter Job Profile and Company Name
              </AlertDialogTitle>
              <AlertDialogDescription>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-md text-black"
                  placeholder="Job Profile *"
                  onChange={(e) => setJobProfile(e.target.value)}
                />
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-md mt-4 text-black"
                  placeholder="Company Name "
                  onChange={(e) => setCompanyName(e.target.value)}
                />
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
                  <Button onClick={createResume}>Continue</Button>
                </span>
              )}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {resumes &&
          resumes?.map((item: any, index: number) => (
            <span
              className="relative flex w-[200px] h-[250px] rounded-lg  bg-white/10 justify-center items-center cursor-pointer transition duration-150 active:bg-white/5"
              key={index}
            >
              <span className="absolute -top-2 -right-2 flex items-center gap-4">
                <Download
                  className="size-4 active:scale-90"
                  onClick={() => {
                    toast({
                      title: "Downloading",
                      variant: "warning",
                    });
                    downloadResume(
                      item._id,
                      item.owner,
                      item.resume.jobProfile
                    ).then(() => {
                      toast({
                        title: "Downloaded",
                        variant: "success",
                      });
                    });
                  }}
                />

                <Share2
                  className="size-4  active:scale-90"
                  onClick={() => {
                    window.open(
                      "/share/resume?r=" + item._id + "&u=" + localUser._id,
                      "_blank"
                    );
                  }}
                />
              </span>

              {item.resume.jobProfile}
            </span>
          ))}
      </div>
    </section>
  );
};

export default CreateResume;
