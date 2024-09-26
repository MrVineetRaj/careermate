"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { navLinks } from "@/config/constants";
import { usePathname } from "next/navigation";
import { Input } from "../ui/input";
import { Loader, Menu, Search } from "lucide-react";
import { getUserPortfolio } from "@/config/mongoose/mongoFunction";
import { toast } from "../ui/use-toast";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const HomeNav = () => {
  const pathName = usePathname();
  const [searchInput, setSearchInput] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  if (pathName.includes("/dashboard")) return null;
  if (pathName.includes("/share")) return null;
  if (pathName.includes("/portfolio")) return null;

  const handleSearchQuery = async () => {
    setIsSearching(true);
    if (searchInput === "") return;
    if (searchInput.trim().startsWith("#")) {
      const userName = searchInput.trim().slice(1);
      const res = await fetch(`/api/user?n=` + userName);
      const data = await res.json();

      if (data.status != 200) {
        toast({
          title: data.message,
          variant: "error",
        });
        setIsSearching(false);
      }
      if (data.status === 200) {
        toast({
          title: "User found",
          variant: "success",
        });
        if (data.data.profileType === "Private") {
          toast({
            title: "User is private",
            variant: "warning",
          });
          setIsSearching(false);
          return;
        } else {
          getUserPortfolio(data.data._id)
            .then((res) => {
              toast({
                title: res.message,
                variant: res.type,
              });
              if (res.status === 200) {
                window.open(`/share/portfolio?u=${data.data._id}`, "_blank");
              }
              setIsSearching(false);
            })
            .catch((err) => {
              toast({
                title: "Portfolio not found",
                variant: "error",
              });
              setIsSearching(false);
            });
        }
      }
    }
  };

  return (
    <header className="sticky  z-[50]  top-0 p-5 flex items-center justify-between shadow-primary shadow-[0px_0px_20px] w-full bg-background">
      <Link href={"/"} className="flex gap-1 items-center">
        <Image
          src="/logo.png"
          alt="logo"
          width={35}
          height={35}
          // className="size-10"
        />
      </Link>

      <span className="hidden md:flex gap-5 items-center justify-between transition-all duration-500">
        <span className="flex gap-2 items-center">
          <Input
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
          />
          <span onClick={handleSearchQuery}>
            {isSearching ? (
              <Loader className="size-5 animate-spin" />
            ) : (
              <Search className="w-5 h-5" />
            )}
          </span>
        </span>
        {navLinks.map((link, index) => (
          <Link className="link hover:bg-grad" href={link.href} key={index}>
            {link.title}
          </Link>
        ))}
        <Button
          variant={"gradient"}
          onClick={() => {
            window.open("/dashboard", "_blank");
          }}
        >
          Get Started
        </Button>
      </span>

      <span className="inline-block md:hidden">
        <Sheet>
          <SheetTrigger>
            <Menu className="w-8 h-8" />
          </SheetTrigger>
          <SheetContent className="min-w-[280px]">
            <SheetHeader>
              <SheetTitle>
                <span className="flex gap-2 ">
                  <Image
                    src="/logo.png"
                    alt="logo"
                    width={35}
                    height={35}
                    // className="size-10"
                  />
                  <h3 className="">CareerMate</h3>
                </span>
              </SheetTitle>
              <SheetDescription>
                <span className="flex gap-2 items-center mt-2">
                  <Input
                    onChange={(e) => {
                      setSearchInput(e.target.value);
                    }}
                  />
                  <span onClick={handleSearchQuery}>
                    {isSearching ? (
                      <Loader className="size-5 animate-spin" />
                    ) : (
                      <Search className="w-5 h-5" />
                    )}
                  </span>
                </span>
                <span className="mt-8 inline-block w-full">
                  <Button
                    variant={"gradient"}
                    onClick={() => {
                      window.open("/dashboard", "_blank");
                    }}
                    className="w-full active:scale-90 transition-all duration-500"
                  >
                    Get Started
                  </Button>

                  <span className="mt-5 flex flex-col items-start gap-4">
                    {navLinks.map(
                      (
                        link: {
                          href: string;
                          title: string;
                        },
                        index
                      ) => (
                        <Link
                          className="link hover:text-grad transition-all duration-500 text-xl font-bold"
                          href={link.href}
                          key={index}
                        >
                          {link.title}
                        </Link>
                      )
                    )}
                  </span>
                </span>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </span>
    </header>
  );
};

export default HomeNav;
