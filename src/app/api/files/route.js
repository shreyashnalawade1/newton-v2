import { File } from "@/lib/database/models/File";
import { connectToDatabase } from "@/lib/database/utils";
import { NextResponse } from "next/server";

import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  },
});

const signPut = async (fileId) => {
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `uploads/user-uploads/${fileId}.pdf`,
    ContentType: "application/pdf",
  });

  const url = await getSignedUrl(s3Client, command);
  return url;
};
const signGet = async (key) => {
  const command = new GetObjectCommand({
    Bucket: "bucket.newton.primary.storage",
    Key: key,
  });
  const url = await getSignedUrl(s3Client, command);
  return url;
};

export const POST = async (request) => {
  try {
    // const url = await signGet(
    // "uploads/user-uploads/65d60ad466886430fe0ec22c.pdf"
    // );
    // return NextResponse.json({ url });

    const { title, abstract, tags } = await request.json();
    await connectToDatabase();
    const prevFile = await File.findOne({ title });
    if (prevFile) {
      return NextResponse.json({
        message: "fail",
        error: "title already exits",
        status: 400,
      });
    }

    const data1 = await getServerSession(options);
    const userId = data1?.token?.token?.user?._id;
    const authors = [userId];
    // console.log(tags);
    const newFile = new File({
      title,
      abstract,
      tags,
      authors,
    });

    const createdFile = await newFile.save();

    const postUrl = await signPut(createdFile._id);

    return NextResponse.json({
      message: "pending",
      createdFile,
      postUrl,
      status: 201,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      message: "fail",
      status: 500,
    });
  }
};

export const GET = async (request) => {
  try {
    let tags = request.nextUrl.searchParams.get("tags");

    await connectToDatabase();
    if (tags !== "blank") {
      const data = await File.aggregate([
        { $sample: { size: 100 } },
        { $match: { tags } },
      ]);
      const res = await File.populate(data, { path: "authors" });
      return NextResponse.json(res);
    } else {
      const data = await File.aggregate([{ $sample: { size: 100 } }]);
      const res = await File.populate(data, { path: "authors" });
      return NextResponse.json(res);
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      message: "success",
      status: 500,
    });
  }
};
