import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ProfilePromt from "./ProfilePromt";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function PaperCard({ data }) {
  console.log(data);
  const handleClick = () => {
    redirect("/app/paper/" + data._id);
  };

  return (
    <Link href={"/app/paper/" + data._id}>
      <Card className=" mt-3 ">
        <CardHeader>
          <CardDescription className="text-xs flex items-center gap-3">
            <ProfilePromt
              name={data?.authors[0]?.name}
              src={data?.authors[0]?.img}
            ></ProfilePromt>{" "}
            <span style={{ fontSize: "2px" }}></span>
          </CardDescription>
          <CardTitle>
            <p className="font-bold text-xs">{data?.title}</p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-xs">
            {data?.abstract}
          </CardDescription>
        </CardContent>
        <CardFooter className="flex">
          <div className="flex-grow hidden sm:block">
            <Badge variant="secondary" className="text-xs">
              {data?.tags}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-xs">{data?.numCitation} citation</p>
            <Badge className="text-xs">100$</Badge>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
