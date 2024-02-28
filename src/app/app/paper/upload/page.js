"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { handleUpload } from "@/lib/services/uploadUtil";

export default function Upload() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.abstract ||
      !formData.tag ||
      !formData.file
    ) {
      setError("Please Fill out all filds");
      return;
    }
    await handleUpload(formData);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === "file") {
      value = e.target.files[0];
    }
    setFormData((s) => {
      return { ...s, [name]: value };
    });
  };
  return (
    <div className="h-full w-full flex justify-center items-center">
      <Card className="w-11/12 md:w-2/5 lg:w-2/5 bg-white">
        <form onSubmit={handleSubmit} onChange={handleChange}>
          <CardHeader>
            <CardTitle>Upload A Research Paper</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Input
              type="text"
              placeholder="Enter Paper Title"
              name="title"
            ></Input>
            <Textarea
              name="abstract"
              placeholder="Enter Paper Abstract "
            ></Textarea>
            <Select name="tag">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select A Tag" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Machine Learning">
                  Machine Learning
                </SelectItem>
                <SelectItem value="Artifical Intelligance">
                  Artifical Intelligance
                </SelectItem>
                <SelectItem value="Physics">Physics</SelectItem>
              </SelectContent>
            </Select>

            <Input
              type="file"
              placeholder="Select A PDF File"
              name="file"
            ></Input>
          </CardContent>
          <CardFooter>
            <Button>Submit</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
