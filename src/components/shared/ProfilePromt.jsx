import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export default function ProfilePromt({ name, src }) {
  return (
    <span className="flex gap-2 items-center">
      <Avatar className="h-5 w-5 ">
        <AvatarImage src={src} alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <span className="text-xs">{name}</span>
    </span>
  );
}
