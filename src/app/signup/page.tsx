import SigninForm from "@/components/SigninForm";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      <h1 className="text-[0.6] md:text-sm my-5 text-center">
        Already sign up, Kindly{" "}
        <Link href={"/signin"} className="text-blue-600">
          Sign in
        </Link>
      </h1>
      <SigninForm />
    </div>
  );
};

export default page;
