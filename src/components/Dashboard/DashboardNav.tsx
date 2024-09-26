"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { dashboardNavLinks } from "@/config/constants";
import { usePathname } from "next/navigation";
import { useCareerMateStore } from "@/store/store";
import CustomButton from "../shared/CustomButton";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";

const DashboardNav = () => {
  const pathName = usePathname();
  const { localUser } = useCareerMateStore();

  if (!pathName.includes("/dashboard")) {
    return null;
  }
  if (pathName.includes("/sign-in") || pathName.includes("/sign-up")) {
    return null;
  }

  return (
    <header className="p-5 flex items-center justify-between">
      <Link href={"/"} className="flex gap-1 items-center">
        <Image src="/logo.png" alt="logo" width={35} height={35} />
        <h3 className="hidden lg:inline-block">CareerMate</h3>
      </Link>

      <nav className="hidden md:flex  gap-5 items-center justify-between transition-all duration-500">
        {dashboardNavLinks.map((link, index) => (
          <Link
            key={index}
            className=""
            href={link.href + "?r=" + localUser?._id}
          >
            <CustomButton
              isActive={pathName.includes(`${link.href}`)}
              title={link.title}
            />
          </Link>
        ))}
      </nav>

      <span className="inline-block md:hidden  gap-5  ">
        <Sheet>
          <SheetTrigger>
            <MenuIcon size={24} />
          </SheetTrigger>
          <SheetContent className="w-[280px] min-w-[280px]  ">
            <SheetHeader>
              <SheetTitle className="text-left ">
                <Link href={"/"} className="flex gap-1 items-center">
                  <Image src="/logo.png" alt="logo" width={35} height={35} />
                  <h3 className="">CareerMate</h3>
                </Link>
              </SheetTitle>
              <SheetDescription className="flex flex-col gap-5  justify-between items-start transition-all duration-500">
                {dashboardNavLinks.map((link, index) => (
                  <Link
                    key={index}
                    className=""
                    href={link.href + "?r=" + localUser?._id}
                  >
                    <CustomButton
                      isActive={pathName.includes(`${link.href}`)}
                      title={link.title}
                      className="text-lg font-semibold"
                    />
                  </Link>
                ))}
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </span>
    </header>
  );
};

export default DashboardNav;
