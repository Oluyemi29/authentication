"use client";
import { forgetPassword } from "@/components/serverAction/action";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const page = () => {
  const emailSchema = z.object({
    email: z.string().email("This is not email format"),
    password: z
      .string()
      .min(4, "minimum of 4 chars")
      .max(32, "maximum of 32 chars"),
  });
  type emailSchemaType = z.infer<typeof emailSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useForm<emailSchemaType>({
    resolver: zodResolver(emailSchema),
  });
  const submit = (data: emailSchemaType) => {
    console.log(data);
    forgetPassword(data);
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Why do u forget your password</h1>
      <form
        className="w-full flex flex-col justify-center items-center"
        action=""
        onSubmit={handleSubmit(submit)}
        method=""
      >
        <Input
          className="w-[90%] md:w-[50%] h-12 rounded-md my-2"
          {...register("email")}
          errorMessage={errors.email?.message}
          isInvalid={!!errors.email}
          type="email"
          placeholder="Enter Email"
        />
        <Input
          className="w-[90%] md:w-[50%] h-12 rounded-md my-2"
          {...register("password")}
          errorMessage={errors.password?.message}
          isInvalid={!!errors.password}
          type="password"
          placeholder="Enter Password"
        />
        <Button className="w-max px-4 " type="submit">
          Confirm Email
        </Button>
      </form>
    </div>
  );
};

export default page;
