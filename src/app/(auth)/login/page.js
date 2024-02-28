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
import { login } from "@/lib/services/authUtil";
import { formatRevalidate } from "next/dist/server/lib/revalidate";
export default function Login() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);.
    if (!formData.email || !formData.password) {
      setError("Please add email or password!");
      return;
    }
    login(formData);
    console.log("handle submit");
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // console.log(name, value);
    setFormData((s) => {
      return {
        ...s,
        [name]: value,
      };
    });
  };

  return (
    <>
      <div className="  font-libre_g text-5xl  bg-black text-white pl-5 pt-2 flex  lg:hidden md:hidden">
        NEWTON
      </div>
      <div className="h-screen w-screen bg-white grid grid-cols-2 grid-rows-1">
        <div className="bg-white h-full w-full  hidden md:flex  lg:flex flex-col">
          <div className="h-1/10 font-libre_g text-5xl  bg-black text-white pl-5 pt-2">
            NEWTON
          </div>
          <div className=" w-full relative flex-grow">
            <Image src={authPic} alt="newton holding apple" fill></Image>
          </div>
        </div>
        <div className=" h-full flex justify-center items-center col-span-2 lg:col-span-1 md:col-span-1">
          <Card className="w-5/6 md:w-1/2 lg:w-1/2 ">
            <form onSubmit={handleSubmit} onChange={handleChange}>
              <CardHeader>
                <CardTitle>Login</CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  placeholder="Email"
                ></Input>

                <Input
                  type="password"
                  placeholder="Password"
                  className="mt-2"
                  name="password"
                  value={formData.password}
                ></Input>
              </CardContent>
              <CardFooter className="flex flex-col">
                <CardDescription>
                  {"Don't have a account signup now"}
                </CardDescription>
                <Button className="w-1/2 mt-2"> Login</Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
}
