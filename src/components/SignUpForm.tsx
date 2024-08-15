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
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignUpForm = () => {
  const [seePassWord, setSeePassword] = useState(false);
  const formSchema = z.object({
    email: z.string().email("must be an email"),
    password: z
      .string()
      .min(4, "minimum of 4 chars")
      .max(32, "maximum of 32 chars"),
  });

  type formSchemaType = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isLoading },
  } = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const router = useRouter();
  const submit = async (data: formSchemaType) => {
    try {
      const { email, password } = data;
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res?.ok) {
        toast.success("login successfully");
        router.push("/profile");
        console.log(res);
      } else {
        toast.error("something went wrong with in your credentials");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong when login in");
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
          className="w-full flex flex-col gap-6 border-2 border-slate-600 rounded-md p-5"
          action=""
          method="post"
          onSubmit={handleSubmit(submit)}
        >
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
          <Button
            type="submit"
            color="primary"
            className="m-auto text-center w-max px-10 mt-10 py-1"
          >
            Submit
          </Button>
        </form>
        <Link href={"/forgetpassword"}>
          <h1 className="text-blue-600 mt-3 text-sm">Forget Password</h1>
        </Link>
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

export default SignUpForm;
