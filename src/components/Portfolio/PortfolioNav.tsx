"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { portfolioNavLinks } from "@/config/constants";
import { usePathname } from "next/navigation";

const PortfolioNav = () => {
  const pathName = usePathname();
  if (pathName.includes("/dashboard")) return null;

  return (
    <header className="sticky  z-[10000000] glassmorphism top-0 p-5 flex items-center justify-between">
      <Link href={"/"} className="flex gap-1 items-center">
        <Image src="/logo.png" alt="logo" width={35} height={35} />
        <h3>CareerMate</h3>
      </Link>

      <nav className="flex gap-5 items-center justify-between transition-all duration-500">
        {portfolioNavLinks.map((link, index) => (
          <Link className="link hover:bg-grad" href={link.href} key={index}>
            {link.title}
          </Link>
        ))}
        
      </nav>
    </header>
  );
};

export default PortfolioNav;
