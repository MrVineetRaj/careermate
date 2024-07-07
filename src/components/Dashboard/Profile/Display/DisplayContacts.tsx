"use client";
import { Pencil, Plus, Trash } from "lucide-react";
import React from "react";
import EditContacts, { AddContactLinks } from "../Edit/EditContacts";
import { userProfileInterface } from "@/config/TypeScriptTypes";
import { useCareerMateStore } from "@/store/store";

const DisplayContacts = ({
  user_profile,
}: {
  user_profile: userProfileInterface;
}) => {
  const { setUserProfileActive, renderKey, updateRenderKey } =
    useCareerMateStore();

  const handleUpdateContact = ({
    phone,
    address,
  }: {
    phone: string;
    address: string;
  }) => {
    let tempProfile = user_profile;
    tempProfile.phone = phone;
    tempProfile.location = address;
    setUserProfileActive(tempProfile);
    console.log(renderKey);
  };

  const handleDeleteLink = ({ title }: { title: string }) => {
    let tempProfile = user_profile;
    let tempLinks = tempProfile?.links?.filter((item) => item.title !== title);
    tempProfile.links = tempLinks;
    setUserProfileActive(tempProfile);

    updateRenderKey();
  };
  const handleAddLink = ({ title, href }: { title: string; href: string }) => {
    let tempProfile = user_profile;

    tempProfile.links.push({
      title,
      href,
    });

    setUserProfileActive(tempProfile);
    console.log(renderKey);
  };

  return (
    <div className="px-2" key={renderKey}>
      <h3 className="text-primary flex justify-between items-center pb-1 border-b border-b-primary">
        Contacts{" "}
        <span>
          <EditContacts
            handleUpdateContact={handleUpdateContact}
            user_profile={user_profile}
          />
        </span>
      </h3>
      <div className="">
        <p>{user_profile?.name}</p>
        <p>{user_profile?.email}</p>
        <p>{user_profile?.phone}</p>
        <p>{user_profile?.location}</p>
        <p className="flex items-center justify-between pb-1 border-b border-b-primary">
          Links{" "}
          <AddContactLinks
            handleAddLink={handleAddLink}
            user_profile={user_profile}
          />
        </p>
        <span className="flex gap-2 mt-4">
          {user_profile?.links?.map((link, index) => (
            <div className="relative" key={index}>
              <span className="absolute -top-4 -right-1 flex gap-2 ">
                <Trash
                  className="text-red-500 w-4 cursor-pointer active:scale-90"
                  onClick={() => {
                    handleDeleteLink({ title: link.title });
                  }}
                />
              </span>
              <a
                key={index}
                className="p-2 border border-primary text-sm rounded-md hover:bg-primary  transition-all"
                href={link?.href}
              >
                {link?.title}
              </a>
            </div>
          ))}
        </span>
      </div>
    </div>
  );
};

export default DisplayContacts;
