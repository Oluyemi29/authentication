"use client";
import React from "react";
import { Progress } from "@nextui-org/react";
import { passwordStrength } from "check-password-strength";


type passwordProps = {
  passStr: string;
};

const PasswordPower = ({ passStr }: passwordProps) => {
   const score = passwordStrength(passStr).id


  const valueForColor = () => {
    switch (score) {
      case 0:
        return "danger";

      case 1:
        return "warning";

      case 2:
        return "secondary";

      case 3:
        return "success";

      default:
        break;
    }
  }
  const valueForProgress = () => {
    switch (score) {
      case 0:
        return 25;

      case 1:
        return 50;

      case 2:
        return 75;

      case 3:
        return 100;

      default:
        break;
    }
  };

  return (
    <div>
      <Progress
        aria-label="Loading..."
        value={valueForProgress()}
        color={valueForColor()}
        className="max-w-md"
      />
    </div>
  );
};

export default PasswordPower;
