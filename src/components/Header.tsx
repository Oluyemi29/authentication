"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Header = () => {
  const { data: session, status } = useSession();
  console.log(session, status);

  const router = useRouter();

  return (
    <div className="bg-slate-600">
      <Navbar
        classNames={{
          item: [
            "flex",
            "relative",
            "h-full",
            "items-center",
            "data-[active=true]:after:content-['']",
            "data-[active=true]:after:absolute",
            "data-[active=true]:after:bottom-0",
            "data-[active=true]:after:left-0",
            "data-[active=true]:after:right-0",
            "data-[active=true]:after:h-[2px]",
            "data-[active=true]:after:rounded-[2px]",
            "data-[active=true]:after:bg-primary",
          ],
        }}
      >
        <NavbarBrand>
          <p className="font-bold text-inherit">Home</p>
        </NavbarBrand>
        {status === "authenticated" ? (
          <>
            <NavbarContent justify="end">
              <NavbarItem>
                <Link
                  href={"/profile"}
                  className="bg-slate-900 rounded-md px-4 py-2 text-white"
                >
                  {session?.user?.firstName}
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link
                  href={"/signin"}
                  className="bg-slate-900 rounded-md px-4 py-2 text-white"
                  onClick={() => {
                    signOut();
                  }}
                >
                  Sign Out
                </Link>
              </NavbarItem>
            </NavbarContent>
          </>
        ) : (
          <>
            <NavbarContent justify="end">
              <NavbarItem className=" lg:flex">
                <Link className="decoration-slate-900" href="/signin">
                  Sign in
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link
                  className="bg-slate-900 rounded-md px-4 py-2 text-white"
                  href="/signup"
                >
                  Sign Up
                </Link>
              </NavbarItem>
            </NavbarContent>
          </>
        )}
      </Navbar>
    </div>
  );
};

export default Header;
