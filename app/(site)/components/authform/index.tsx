// it used to tell next that it is not a server component because it has form
"use client";
// import Button from "@/app/components/button";
import Input from "@/app/components/inputs";
import React, { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import AuthSocialButton from "../authSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

type FormVariant = "LOGIN" | "REGISTER";
const AuthForm = () => {
  const session = useSession();
  const router = useRouter();
  const [formVariant, setFormVariant] = useState<FormVariant>("LOGIN");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    if (session?.status === "authenticated") {
      console.log("I am authenticated");
      router.push("/users");
    }
  }, [session?.status, router]);
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
    setError,
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (data.password.length < 8) {
      setError("password", {
        type: "manual",
        message: "Password must be at least 8 characters long",
      });
      return;
    }
    setIsLoading(true);
    if (formVariant === "LOGIN") {
      // NEXTAUTH SIGNIN
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials");
          } else if (callback?.ok) {
            toast.success("Logged In!");
            router.push("/users");
          }
        })
        .finally(() => setIsLoading(false));
    } else if (formVariant === "REGISTER") {
      //REGISTER USER
      axios
        .post("/api/register", data)
        .then(() => signIn("credentials", data))
        .catch(() => {
          toast.error("Something Went Wrong!");
          console.log("errors", errors, data);
        })
        .finally(() => setIsLoading(false));
    }
  };

  const socialSignin = (action: string) => {
    setIsLoading(true);

    // Nextauth Social Signin
    signIn(action, {
      redirect: false,
    })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid credentials");
        } else if (callback?.ok) {
          toast.success("Logged In!");
        }
      })
      .finally(() => setIsLoading(false));
  };
  console.log("errors", errors);
  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {formVariant === "REGISTER" && (
            <>
              <TextField
                {...register("name", { required: true })}
                id="name"
                label="Your Name"
                error={errors.name ? true : false}
                helperText={errors.name ? "Name is required" : ""}
                variant="outlined"
                className="w-full"
                disabled={isLoading}
                type="text"
              />
            </>
          )}
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            type="email"
            disabled={isLoading}
            {...register("email", { required: true })}
            className="w-full"
            error={errors.email ? true : false}
            helperText={errors.email ? "Email is required" : ""}
          />
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            type="password"
            {...register("password", {
              required: true,
            })}
            className="w-full"
            error={errors.password ? true : false}
            helperText={errors.password ? "Password is required" : ""}
            disabled={isLoading}
          />
          <div>
            <Button
              variant="outlined"
              fullWidth
              type="submit"
              disabled={isLoading}
              className="hover:bg-blue-500 hover:text-white"
            >
              {formVariant === "LOGIN" ? "Sign in" : "Register"}
            </Button>
          </div>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or Continue With
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-2 w-full">
            <Button
              startIcon={<BsGithub />}
              variant="outlined"
              onClick={() => socialSignin("github")}
              className="w-full"
            />
            <Button
              startIcon={<BsGoogle />}
              variant="outlined"
              className="w-full"
              onClick={() => socialSignin("google")}
            />
          </div>
        </div>
        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
          <div>
            {formVariant === "LOGIN"
              ? "New to Messenger?"
              : "Already have an account?"}
          </div>
          <div
            onClick={toggleFormVaraint}
            className="underline cursor-pointer "
          >
            {formVariant === "LOGIN" ? "Create an account" : "Login"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
