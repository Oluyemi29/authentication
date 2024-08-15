"use server";
import sendMail from "@/lib/mail";
import mailTemplate from "@/lib/mailTemplate";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import Handlebars from "handlebars";
import { signIn } from "next-auth/react";
const prisma = new PrismaClient();
type formSchem = {
  firtName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
};
type loginSchem = {
  email: string;
  password: string;
};
export const ServerAction = async (data: formSchem) => {
  try {
    const { email, firtName, lastName, password, phone } = data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!result) {
      const myResult = await prisma.user.create({
        data: {
          email,
          firstName: firtName,
          lastName,
          phone,
          password: hashedPassword,
        },
      });
      const template = Handlebars.compile(mailTemplate);
      const name = firtName;
      const url = `${process.env.NEXTAUTH_URL}/activatedmail/${myResult.id}`;
      const body = template({
        name,
        url,
      });
      const mailMe = myResult.email;
      await sendMail({ mailMe, body });
      // console.log(url)
    } else {
      console.log("account already regtistered");
    }
  } catch (error) {
    console.log(error);
  }
};

export const LoginAction = async (data: loginSchem) => {
  const { email, password } = data;
  const res = await signIn("credentials", {
    email,
    password,
    redirect: false,
  });
  console.log(res);
};

export const emailVerified = async (id: string) => {
  // console.log(id);
  await prisma.user.update({
    where: {
      id,
    },
    data: {
      emailVerified: new Date(),
    },
  });
};

type forgetProps = {
  email: string;
  password: string;
};

export const forgetPassword = async (data: forgetProps) => {
  try {
    const { email, password } = data;
    const existEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!existEmail) {
      return null;
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: {
        email,
      },
      data: {
        password: hashedPassword,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
