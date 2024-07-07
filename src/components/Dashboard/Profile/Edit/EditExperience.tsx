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
import { useToast } from "@/components/ui/use-toast";
import { experienceInterface } from "@/config/TypeScriptTypes";
import { useCareerMateStore } from "@/store/store";
import { Pencil, Plus, Trash } from "lucide-react";
import { useState } from "react";

export const AddExperience = ({
  addOneExperience,
}: {
  addOneExperience: ({
    experience,
  }: {
    experience: experienceInterface;
  }) => void;
}) => {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");

  const addNewExperience = async () => {
    if (
      title === "" ||
      company === "" ||
      location === "" ||
      startDate === "" ||
      endDate === "" ||
      description === ""
    ) {
      toast({
        title: "All fields are required",
        variant: "error",
      });
      return;
    }

    const newExperience: experienceInterface = {
      title,
      company,
      location,
      startDate,
      endDate,
      description,
    };

    addOneExperience({ experience: newExperience });
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
            <AlertDialogTitle>New Experience</AlertDialogTitle>
            <AlertDialogDescription>
              {/* <input
                type="text"
                className="w-full px-4 py-2 rounded-md mt-4 text-black"
                placeholder="Title *"
                onChange={(e) => setTitle(e.target.value)}
              /> */}

              <input
                type="text"
                className="w-full px-4 py-2 rounded-md mt-4 text-black"
                placeholder="Title *"
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="text"
                className="w-full px-4 py-2 rounded-md mt-4 text-black"
                placeholder="Company *"
                onChange={(e) => setCompany(e.target.value)}
              />
              <input
                type="text"
                className="w-full px-4 py-2 rounded-md mt-4 text-black"
                placeholder="Location *"
                onChange={(e) => setLocation(e.target.value)}
              />
              <span className="flex gap-4">
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-md mt-4 text-black"
                  placeholder="Start Date *"
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-md mt-4 text-black"
                  placeholder="End Date *"
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </span>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-md mt-4 text-black"
                placeholder="Overview *"
                onChange={(e) => setDescription(e.target.value)}
              />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={addNewExperience}>
              Add
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </span>
  );
};

export const DeleteOneExperience = ({
  deleteOneExperience,
  index,
}: {
  deleteOneExperience: ({ index }: { index: number }) => void;
  index: number;
}) => {
  return (
    <span className="cursor-pointer">
      <AlertDialog>
        <AlertDialogTrigger>
          <Trash className="text-red-500 w-4 cursor-pointer active:scale-90" />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Experience</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this experience?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteOneExperience({ index })}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </span>
  );
};

const EditExperience = ({
  updateOneExperience,
  index,
}: {
  updateOneExperience: ({
    experience,
    index,
  }: {
    experience: experienceInterface;
    index: number;
  }) => void;
  index: number;
}) => {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");

  const { user_profile_active } = useCareerMateStore();
  const editExperience = async () => {
    if (
      title === "" ||
      company === "" ||
      location === "" ||
      startDate === "" ||
      endDate === "" ||
      description === ""
    ) {
      toast({
        title: "All fields are required",
        variant: "error",
      });
      return;
    }
    const experience: experienceInterface = {
      title,
      company,
      location,
      startDate,
      endDate,
      description,
    };

    updateOneExperience({ experience, index });

    toast({
      title: "Please click on Save button to save the changes",
      variant: "warning",
    });
  };

  return (
    <span>
      <AlertDialog>
        <AlertDialogTrigger>
          <Pencil className="w-4 h-4 active:scale-90" />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Edit Experience</AlertDialogTitle>
            <AlertDialogDescription>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-md mt-4 text-black"
                placeholder="Title *"
                defaultValue={user_profile_active.experiences[index].title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="text"
                className="w-full px-4 py-2 rounded-md mt-4 text-black"
                placeholder="Company *"
                defaultValue={user_profile_active.experiences[index].company}
                onChange={(e) => setCompany(e.target.value)}
              />
              <input
                type="text"
                className="w-full px-4 py-2 rounded-md mt-4 text-black"
                placeholder="Location *"
                defaultValue={user_profile_active.experiences[index].location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <span className="flex gap-4">
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-md mt-4 text-black"
                  placeholder="Start Date *"
                  defaultValue={
                    user_profile_active.experiences[index].startDate
                  }
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-md mt-4 text-black"
                  placeholder="End Date *"
                  defaultValue={user_profile_active.experiences[index].endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </span>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-md mt-4 text-black"
                placeholder="Overview *"
                defaultValue={
                  user_profile_active.experiences[index].description
                }
                onChange={(e) => setDescription(e.target.value)}
              />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={editExperience}>
              Update
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </span>
  );
};

export default EditExperience;
