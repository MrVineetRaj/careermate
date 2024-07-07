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
import { Pencil, Plus, Trash } from "lucide-react";
import { useState } from "react";

/*
{
{
      title: "Hackathon Winner",
      description: "First place in the Tech Challenge Hackathon 2019.",
    },
  },
*/
export const AddAchievements = ({
  addNewAchievement,
}: {
  addNewAchievement: ({
    achievement,
  }: {
    achievement: { title: string; description: string };
  }) => void;
}) => {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addNewAchievements = () => {
    if (title === "" || description === "") {
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
    addNewAchievement({ achievement: { title, description } });
  };
  return (
    <span>
      <AlertDialog>
        <AlertDialogTrigger>
          <Plus className="w-4 h-4" />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>New Achievement</AlertDialogTitle>
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
                placeholder="Overview *"
                onChange={(e) => setDescription(e.target.value)}
              />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={addNewAchievements}>
              Add
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </span>
  );
};

export const DeleteAchievement = ({
  deleteOneAchievement,
  index,
}: {
  deleteOneAchievement: ({ index }: { index: number }) => void;
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
            <AlertDialogTitle>Delete Achievement</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this achievement?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteOneAchievement({ index })}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </span>
  );
};
const EditAchievement = ({
  updateOneAchievement,
  index,
  item,
}: {
  updateOneAchievement: ({
    achievement,
    index,
  }: {
    achievement: { title: string; description: string };
    index: number;
  }) => void;
  index: number;
  item: { title: string; description: string };
}) => {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const editAchievement = () => {
    if (title === "" || description === "") {
      toast({
        title: "All fields are required",
        variant: "error",
      });
      return;
    }

    updateOneAchievement({ achievement: { title, description }, index });
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
            <AlertDialogTitle>Edit Achievement</AlertDialogTitle>
            <AlertDialogDescription>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-md mt-4 text-black"
                placeholder="Title *"
                defaultValue={item.title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="text"
                className="w-full px-4 py-2 rounded-md mt-4 text-black"
                placeholder="Overview *"
                defaultValue={item.description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={editAchievement}>
              Update
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </span>
  );
};

export default EditAchievement;
