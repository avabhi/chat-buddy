// it used to tell next that it is not a server component because it has form
"use client";
import Input from "@/app/components/input";
import React, { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

type FormVariant = "LOGIN" | "REGISTER";
const AuthForm = () => {
  const [formVariant, setFormVariant] = useState<FormVariant>("LOGIN");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toggleFormVaraint = useCallback(() => {
    if (formVariant === "LOGIN") {
      setFormVariant("REGISTER");
    } else {
      setFormVariant("LOGIN");
    }
  }, [formVariant]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    if (formVariant === "LOGIN") {
      // NEXTAUTH SIGNIN
    } else if (formVariant === "REGISTER") {
      //REGISTER USER
    }
  };

  const socialSignin = (action: string) => {
    setIsLoading(true);

    // Nextauth Social Signin
  };
  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <Input register={register} id="email" label="email" errors={errors} />
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
