import { emailVerified } from "@/components/serverAction/action";
import React from "react";

type paramsProps = {
  params: {
    id: string;
  };
};
const page = ({ params: { id } }: paramsProps) => {
//   console.log(id);
  emailVerified(id);
  return (
    <div>
      <h1>Welcome U have been verified</h1>
    </div>
  );
};

export default page;
