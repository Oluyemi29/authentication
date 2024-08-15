"use client"
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@nextui-org/react'
import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const ForgetPasswordForm = () => {
    const emailSchema = z.object({
        email: z.string().email("This is not email format"),
      });
      type emailSchemaType = z.infer<typeof emailSchema>;
    
      const {register,handleSubmit,formState:{errors}} = useForm<emailSchemaType>({
        resolver : zodResolver(emailSchema)
      });
  return (
    <div>
      <form action="" method="">
        <Input type="email" placeholder="Enter Email" />
        <Input type="email" placeholder="Enter Email" />
        <Button>Confirm Email</Button>
      </form>
    </div>
  )
}

export default ForgetPasswordForm
