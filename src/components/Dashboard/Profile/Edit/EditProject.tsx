"use client";
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useToast } from "@/components/ui/use-toast";
import { projectInterface } from "@/config/TypeScriptTypes";
import { useCareerMateStore } from "@/store/store";
import { Pencil, Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export const AddProject = ({
  addOneProject,
}: {
  addOneProject: (project: projectInterface) => void;
}) => {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [GitHub, setGitHub] = useState("");
  const [Demo, setDemo] = useState("");
  const { localUser } = useCareerMateStore();

  const addNewProject = async () => {
    if (
      title === "" ||
      description === "" ||
      technologies === "" ||
      GitHub === "" ||
      Demo === ""
    ) {
      toast({
        title: "All fields are required",
        variant: "error",
      });
      return;
    }
    const newProject: projectInterface = {
      title,
      description,
      technologies,
      GitHub,
      Demo,
      imageUrl,
    };
    addOneProject(newProject);
    toast({
      title: "Please click on Save button to save the changes",
      variant: "warning",
    });
  };

  return (
    <span>
      <AlertDialog>
        <AlertDialogTrigger>
          <Plus className="w-4 h-4" />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>New Project</AlertDialogTitle>
            <AlertDialogDescription>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-md mt-4 text-black"
                placeholder="Title *"
                onChange={(e) => setTitle(e.target.value)}
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
              </Select>

              {imageUrl && (
                <img
                  src={`${imageUrl}`}
                  alt="image"
                  className="w-full h-auto mt-4"
                />
              )}

              <input
                type="text"
                className="w-full px-4 py-2 rounded-md mt-4 text-black"
                placeholder="Technologies *"
                onChange={(e) => setTechnologies(e.target.value)}
              />
              <span className="flex gap-4">
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-md mt-4 text-black"
                  placeholder="GitHub *"
                  onChange={(e) => setGitHub(e.target.value)}
                />
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-md mt-4 text-black"
                  placeholder="Demo *"
                  onChange={(e) => setDemo(e.target.value)}
                />
              </span>

              <textarea
                className="w-full px-4 py-2 rounded-md mt-4 text-black"
                placeholder="Description *"
                onChange={(e) => setDescription(e.target.value)}
              />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={addNewProject}>Add</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </span>
  );
};

const EditProject = () => {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [GitHub, setGitHub] = useState("");
  const [Demo, setDemo] = useState("");

  const addNewProject = async () => {
    if (
      title === "" ||
      description === "" ||
      imageUrl === "" ||
      technologies === "" ||
      GitHub === "" ||
      Demo === ""
    ) {
      toast({
        title: "All fields are required",
        variant: "error",
      });
      return;
    }

    toast({
      title: "Please click on Save button to save the changes",
      variant: "warning",
    });
  };

  return (
    <span>
      <AlertDialog>
        <AlertDialogTrigger>
          <Pencil className="w-4 h-4" />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Edit Project</AlertDialogTitle>
            <AlertDialogDescription>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-md mt-4 text-black"
                placeholder="Title *"
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="text"
                className="w-full px-4 py-2 rounded-md mt-4 text-black"
                placeholder="Image URL *"
                onChange={(e) => setImageUrl(e.target.value)}
              />
              <input
                type="text"
                className="w-full px-4 py-2 rounded-md mt-4 text-black"
                placeholder="Technologies *"
                onChange={(e) => setTechnologies(e.target.value)}
              />
              <span className="flex gap-4">
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-md mt-4 text-black"
                  placeholder="GitHub *"
                  onChange={(e) => setGitHub(e.target.value)}
                />
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-md mt-4 text-black"
                  placeholder="Demo *"
                  onChange={(e) => setDemo(e.target.value)}
                />

                <textarea
                  className="w-full px-4 py-2 rounded-md mt-4 text-black"
                  placeholder="Description *"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={addNewProject}>
              Update
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </span>
  );
};

export default EditProject;
