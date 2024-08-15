import SignUpForm from "@/components/SignUpForm";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      <h1 className="text-[0.6] md:text-sm my-5 text-center">
        Dont have an Account, Kindly{" "}
        <Link href={"/signup"} className="text-blue-600">
          Sign Up
        </Link>
      </h1>
      <SignUpForm />
      
    </div>
  );
};

export default page;
