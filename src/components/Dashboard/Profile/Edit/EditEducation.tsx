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
import { educationInterface } from "@/config/TypeScriptTypes";
import { useCareerMateStore } from "@/store/store";
import { Pencil, Plus, Trash } from "lucide-react";
import { useState } from "react";

export const AddEducation = ({
  addOneEducation,
}: {
  addOneEducation: ({ education }: { education: educationInterface }) => void;
}) => {
  const { toast } = useToast();
  const [degree, setDegree] = useState("");
  const [institution, setInstitution] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [marks, setMarks] = useState("");

  const addNewEducation = async () => {
    if (
      degree === "" ||
      institution === "" ||
      location === "" ||
      startDate === "" ||
      endDate === "" ||
      marks === ""
    ) {
      toast({
        title: "All fields are required",
        variant: "error",
      });
      return;
    }

    const education = {
      degree,
      institution,
      location,
      startDate,
      endDate,
      marks,
    };

    addOneEducation({ education });
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
            <AlertDialogTitle>New Education</AlertDialogTitle>
            <AlertDialogDescription>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-md mt-4 text-black"
                placeholder="Degree *"
                onChange={(e) => setDegree(e.target.value)}
              />
              <input
                type="text"
                className="w-full px-4 py-2 rounded-md mt-4 text-black"
                placeholder="Institution *"
                onChange={(e) => setInstitution(e.target.value)}
              />
              <input
                type="text"
                className="w-full px-4 py-2 rounded-md mt-4 text-black"
                placeholder="Location *"
                onChange={(e) => setLocation(e.target.value)}
              />
              <span className="flex gap-2 items-center">
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
                placeholder="Marks *"
                onChange={(e) => setMarks(e.target.value)}
              />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={addNewEducation}>Add</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </span>
  );
};

export const DeleteEducation = ({
  deleteOneEducation,
  index,
}: {
  deleteOneEducation: ({ index }: { index: number }) => void;
  index: number;
}) => {
  const { toast } = useToast();

  const deleteEducation = async () => {
    deleteOneEducation({ index });
    toast({
      title: "Please click on Save button to save the changes",
      variant: "warning",
    });
  };

  return (
    <span>
      <AlertDialog>
        <AlertDialogTrigger>
          <Trash className="text-red-500 w-4 cursor-pointer active:scale-90" />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Education</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this education?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteEducation}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </span>
  );
};

export const EditEducation = ({
  editOneEducation,
  index,
}: {
  editOneEducation: ({
    education,
    index,
  }: {
    education: educationInterface;
    index: number;
  }) => void;
  index: number;
}) => {
  const { user_profile_active } = useCareerMateStore();

  const { toast } = useToast();
  const [degree, setDegree] = useState("");
  const [institution, setInstitution] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [marks, setMarks] = useState("");

  const editEducation = async () => {
    if (
      degree === "" ||
      institution === "" ||
      location === "" ||
      startDate === "" ||
      endDate === "" ||
      marks === ""
    ) {
      toast({
        title: "All fields are required",
        variant: "error",
      });
      return;
    }

    const education = {
      degree,
      institution,
      location,
      startDate,
      endDate,
      marks,
    };

    editOneEducation({ education, index });
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
            <AlertDialogTitle>Edit Education</AlertDialogTitle>
            <AlertDialogDescription>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-md mt-4 text-black"
                placeholder="Degree *"
                defaultValue={user_profile_active.education[index].degree}
                onChange={(e) => setDegree(e.target.value)}
              />
              <input
                type="text"
                className="w-full px-4 py-2 rounded-md mt-4 text-black"
                placeholder="Institution *"
                defaultValue={user_profile_active.education[index].institution}
                onChange={(e) => setInstitution(e.target.value)}
              />
              <input
                type="text"
                className="w-full px-4 py-2 rounded-md mt-4 text-black"
                placeholder="Location *"
                defaultValue={user_profile_active.education[index].location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <span className="flex gap-4 items-center">
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-md mt-4 text-black"
                  placeholder="Start Date *"
                  defaultValue={user_profile_active.education[index].startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-md mt-4 text-black"
                  placeholder="End Date *"
                  defaultValue={user_profile_active.education[index].endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </span>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-md mt-4 text-black"
                placeholder="Marks *"
                defaultValue={user_profile_active.education[index].marks}
                onChange={(e) => setMarks(e.target.value)}
              />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={editEducation}>
              Update
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </span>
  );
};
