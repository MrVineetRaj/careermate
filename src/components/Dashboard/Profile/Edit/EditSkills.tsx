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
import { Pencil, Plus } from "lucide-react";
import { useState } from "react";

export const AddNewSkill = ({
  handleAddSkill,
}: {
  handleAddSkill: ({
    label,
    values,
  }: {
    label: string;
    values: string;
  }) => void;
}) => {
  const { toast } = useToast();
  const [label, setLabel] = useState("");
  const [values, setValues] = useState("");

  const addNewSkill = async () => {
    if (label === "" || values === "") {
      toast({
        title: "Skill label and values are required",
        variant: "error",
      });
      return;
    }

    handleAddSkill({ label, values });
    console.log(label, values);
  };

  return (
    <span>
      <AlertDialog>
        <AlertDialogTrigger>
          <Plus className="w-4 h-4" />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>New Skill</AlertDialogTitle>
            <AlertDialogDescription>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-md text-black"
                placeholder="Label *"
                onChange={(e) => setLabel(e.target.value)}
              />
              <input
                type="text"
                className="w-full px-4 py-2 rounded-md mt-4 text-black"
                placeholder="Values *"
                onChange={(e) => setValues(e.target.value)}
              />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={addNewSkill}>Add</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </span>
  );
};

const EditSkill = () => {
  const { toast } = useToast();
  const [Label, setLabel] = useState("");
  const [values, setValues] = useState("");

  const updateSkill = async () => {
    if (Label === "" || values === "") {
      toast({
        title: "Skill label and values are required",
        variant: "error",
      });
      return;
    }
    console.log(Label, values);
  };
  return (
    <div>
      <span className="flex gap-2">
        <span>
          <AlertDialog>
            <AlertDialogTrigger>
              <Pencil className="w-4 h-4" />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Edit Skill</AlertDialogTitle>
                <AlertDialogDescription>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-md text-black"
                    placeholder="Label *"
                    onChange={(e) => setLabel(e.target.value)}
                  />
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-md mt-4 text-black"
                    placeholder="Values *"
                    onChange={(e) => setValues(e.target.value)}
                  />
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={updateSkill}>Add</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </span>
      </span>
    </div>
  );
};

export default EditSkill;
