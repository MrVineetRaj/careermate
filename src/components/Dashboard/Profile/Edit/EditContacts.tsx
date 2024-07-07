"use client";
import React, { useState } from "react";
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
import { userProfileInterface } from "@/config/TypeScriptTypes";
import { useCareerMateStore } from "@/store/store";

const EditContacts = ({
  handleUpdateContact,
  user_profile,
}: {
  handleUpdateContact: ({
    phone,
    address,
  }: {
    phone: string;
    address: string;
  }) => void;
  user_profile: userProfileInterface;
}) => {
  const { toast } = useToast();
  const { updateRenderKey } = useCareerMateStore();
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const updateContacts = async () => {
    if (phone === "" || address === "") {
      toast({
        title: "Phone No and Address are required",
        variant: "error",
      });
      return;
    }

    handleUpdateContact({ phone, address });
    updateRenderKey();
    toast({
      title: "Please save changes before leaving",
      variant: "warning",
    });
  };
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger>
          <Pencil className="w-4 h-4" />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Contact Information</AlertDialogTitle>
            <AlertDialogDescription>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-md text-black"
                placeholder="Phone No *"
                defaultValue={user_profile?.phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <input
                type="text"
                className="w-full px-4 py-2 rounded-md mt-4 text-black"
                placeholder="Address *"
                defaultValue={user_profile?.location}
                onChange={(e) => setAddress(e.target.value)}
              />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={updateContacts}>
              Update
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export const AddContactLinks = ({
  handleAddLink,
  user_profile,
}: {
  handleAddLink: ({ title, href }: { title: string; href: string }) => void;
  user_profile: userProfileInterface;
}) => {
  const { toast } = useToast();
  const [label, setLabel] = useState("");
  const [href, setHref] = useState("");
  const { updateRenderKey } = useCareerMateStore();

  const addNewLink = () => {
    if (label === "" || href === "") {
      toast({
        title: "Label and Url are required",
        variant: "error",
      });
      return;
    }
    handleAddLink({ title: label, href: href });
    updateRenderKey();
    toast({
      title: "Please save changes before leaving",
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
            <AlertDialogTitle>New Social Link</AlertDialogTitle>
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
                placeholder="Url *"
                onChange={(e) => setHref(e.target.value)}
              />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={addNewLink}>Add</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </span>
  );
};
export default EditContacts;
