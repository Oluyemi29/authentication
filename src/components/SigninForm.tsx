"use client";
import { Button, Checkbox, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { CgPassword } from "react-icons/cg";
import { CiPhone } from "react-icons/ci";
import { IoMdContact } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import Image from "next/image";
import { motion } from "framer-motion";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PasswordPower from "./PasswordPower";
import { useForm } from "react-hook-form";
import { ServerAction } from "./serverAction/action";
import toast from "react-hot-toast";

const SigninForm = () => {
  const [seePassWord, setSeePassword] = useState(false);
  const formSchema = z
    .object({
      firtName: z.string().min(5, "minimum of 5").max(30, "maximum of 30"),
      lastName: z.string().min(5, "minimum of 5").max(30, "maximum of 30"),
      email: z.string().email("must be an email"),
      phone: z.string().min(5, "number is required"),
      password: z
        .string()
        .min(4, "minimum of 4 chars")
        .max(32, "maximum of 32 chars"),
      confirmPassword: z
        .string()
        .min(4, "minimum of 4 chars")
        .max(32, "maximum of 32 chars"),
      term: z.boolean().refine(
        (termValues) => {
          return termValues === true;
        },
        {
          message: "u must agreed to the term and condition",
        }
      ),
    })
    .refine(
      (values) => {
        return values.password === values.confirmPassword;
      },
      {
        message: "Password miss match",
        path: ["confirmPassword"],
      }
    );

  type formSchemaType = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isLoading },
  } = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const submit = (data: formSchemaType) => {
    try {
      const { term, confirmPassword, ...others } = data;
      ServerAction(others);
      toast.success("registration successful");
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <div className="flex flex-col-reverse md:flex-row gap-2 md:gap-5 w-full md:w-[80%] mx-auto">
      <motion.div
        initial={{ x: "100vw", scale: 1.5 }}
        animate={{ x: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="w-full"
      >
        <form
          className="w-full flex flex-col gap-4 border-2 border-slate-600 rounded-md p-5"
          action=""
          method="post"
          onSubmit={handleSubmit(submit)}
        >
          <div className="flex w-full md:flex-nowrap gap-4">
            <Input
              {...register("firtName")}
              label="FirstName"
              type="text"
              startContent={<IoMdContact className=" text-slate-900" />}
              placeholder="Enter your First Name"
              errorMessage={errors.firtName?.message}
              isInvalid={!!errors.firtName}
            />

            <Input
              {...register("lastName")}
              label="LastName"
              type="text"
              startContent={<IoMdContact className=" text-slate-900" />}
              placeholder="Enter your Last Name"
              errorMessage={errors.lastName?.message}
              isInvalid={!!errors.lastName}
            />
          </div>
          <Input
            {...register("email")}
            startContent={<AiOutlineMail className="text-slate-900" />}
            type="email"
            label="Email"
            placeholder="Enter your email"
            errorMessage={errors.email?.message}
            isInvalid={!!errors.email}
          />
          <Input
            {...register("phone")}
            startContent={<CiPhone className="text-slate-900" />}
            type="text"
            label="Phone"
            placeholder="Enter your Phone Number"
            errorMessage={errors.phone?.message}
            isInvalid={!!errors.phone}
          />
          <Input
            {...register("password")}
            startContent={<CgPassword className="text-slate-900" />}
            type={seePassWord ? "text" : "password"}
            label="Password"
            placeholder="Enter Password"
            endContent={
              seePassWord ? (
                <FaEyeSlash
                  className="cursor-pointer"
                  onClick={() => setSeePassword(!seePassWord)}
                />
              ) : (
                <FaEye
                  className="cursor-pointer"
                  onClick={() => setSeePassword(!seePassWord)}
                />
              )
            }
            errorMessage={errors.password?.message}
            isInvalid={!!errors.password}
          />
          <PasswordPower passStr={watch().password} />
          <Input
            {...register("confirmPassword")}
            startContent={<CgPassword className="text-slate-900" />}
            type={seePassWord ? "text" : "password"}
            label="Confirm Password"
            placeholder="Confirm Your Password"
            endContent={
              seePassWord ? (
                <FaEyeSlash
                  className="cursor-pointer"
                  onClick={() => setSeePassword(!seePassWord)}
                />
              ) : (
                <FaEye
                  className="cursor-pointer"
                  onClick={() => setSeePassword(!seePassWord)}
                />
              )
            }
            errorMessage={errors.confirmPassword?.message}
            isInvalid={!!errors.confirmPassword}
          />
          <Checkbox {...register("term")} size="md">
            I accept the <span className="text-blue-600">Terms</span>
          </Checkbox>
          {errors.term && (
            <span className="text-red-600 text-[0.6rem]">
              {errors.term.message}
            </span>
          )}
          <Button
            type="submit"
            color="primary"
            className="m-auto text-center w-max px-10 py-1"
          >
            Submit
          </Button>
        </form>
      </motion.div>
      <motion.div
        initial={{ x: "-100vw", scale: 1.5 }}
        animate={{ x: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="md:flex w-full"
      >
        <Image
          src={"/login.png"}
          alt="login key"
          width={100}
          height={100}
          quality={95}
          priority
          className="md:w-full w-36 h-36 m-auto md:h-full"
        />
      </motion.div>
    </div>
  );
};

export default SigninForm;
