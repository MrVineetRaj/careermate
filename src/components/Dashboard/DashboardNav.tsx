"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { dashboardNavLinks } from "@/config/constants";
import { usePathname } from "next/navigation";
import { useCareerMateStore } from "@/store/store";

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
        <h3>CareerMate</h3>
      </Link>

      <nav className="flex gap-5 items-center justify-between transition-all duration-500">
        {dashboardNavLinks.map((link, index) => (
          <Link
            key={index}
            className="link hover:bg-grad"
            href={link.href + "?r=" + localUser?._id}
          >
            {link.title}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default DashboardNav;
