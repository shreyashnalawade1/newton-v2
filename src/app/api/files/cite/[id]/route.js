import { File } from "@/lib/database/models/File";
import { connectToDatabase } from "@/lib/database/utils";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const { id } = params;
  try {
    await connectToDatabase();
    await File.findByIdAndUpdate(id, {
      $inc: { numCitation: 1 },
    });

    return NextResponse.json({
      message: "success",
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      message: "fail",
      status: 500,
    });
  }
};
