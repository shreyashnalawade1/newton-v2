"use client";
import Image from "next/image";
import authPic from "@/app/../../public/assets/auth.jpg";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { login, signup } from "@/lib/services/authUtil";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function Login() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.passwordrepeat
    ) {
      setError("Value is missing");
      return;
    }
    const data = await signup(formData);
    if (data?.message !== "success") {
      setError("Some Error Happened while creating user");
      return;
    }
    await login(formData);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((s) => {
      return { ...s, [name]: value };
    });
  };
  return (
    <>
      <div className="  font-libre_g text-5xl  bg-black text-white pl-5 pt-2 flex  lg:hidden md:hidden">
        NEWTON
      </div>
      <div className="h-screen w-screen bg-white grid grid-cols-2 grid-rows-1">
        <div className="bg-white h-full w-full hidden md:flex  lg:flex flex-col">
          <div className="h-1/10 font-libre_g text-5xl  bg-black text-white pl-5 pt-2">
            NEWTON
          </div>
          <div className=" w-full relative flex-grow">
            <Image src={authPic} alt="newton holding apple" fill></Image>
          </div>
        </div>
        <div className=" h-full flex justify-center items-center  col-span-2 lg:col-span-1 md:col-span-1">
          <Card className="w-5/6 md:w-1/2 lg:w-1/2 ">
            <CardHeader>
              <CardTitle>Signup</CardTitle>
            </CardHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                signIn("github");
              }}
            >
              <CardContent>
                <Button className="w-full"> Github</Button>
              </CardContent>
            </form>
            <form onSubmit={handleSubmit} onChange={handleChange}>
              <CardContent>
                <Input
                  type="name"
                  placeholder="Name"
                  className="mt-2"
                  name="name"
                ></Input>
                <Input
                  type="email"
                  placeholder="Email"
                  name="email"
                  className="mt-2"
                ></Input>
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="mt-2"
                ></Input>
                <Input
                  type="password"
                  name="passwordrepeat"
                  place
                  holder="Confirm Password"
                  className="mt-2"
                ></Input>
              </CardContent>
              <CardFooter className="flex flex-col">
                <Button className="w-1/2 mt-2">Signup</Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
}
