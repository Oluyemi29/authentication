"use client"
import * as React from "react";

import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";

const AppProvider = ({ children }: any) => {
  return (
    <NextUIProvider>
      <SessionProvider>{children}</SessionProvider>
    </NextUIProvider>
  );
};
export default AppProvider;
