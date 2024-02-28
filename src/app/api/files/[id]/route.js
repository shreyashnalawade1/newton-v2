import { File } from "@/lib/database/models/File";
import { connectToDatabase } from "@/lib/database/utils";
import { NextResponse } from "next/server";

import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { User } from "@/lib/database/models/User";
// import { getSession } from "next-auth/react";

import { getServerSession } from "next-auth";
import { options } from "../../auth/[...nextauth]/options";
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  },
});

const signGet = async (key, sec) => {
  const command = new GetObjectCommand({
    Bucket: sec ? process.env.AWS_BUCKET_NAME_SEC : process.env.AWS_BUCKET_NAME,
    Key: key,
  });
  const url = await getSignedUrl(s3Client, command);
  return url;
};

export const GET = async (request, { params }) => {
  const { id } = params;
  try {
    await connectToDatabase();
    const data = await File.findById(id).populate("authors");
    // data.authors[0].password = null;

    // get the current user and fetch it's data
    const data1 = await getServerSession(options);

    // console.log();
    const userId = data1?.token?.token?.user._id;
    const curUser = await User.findById(userId);
    // console.log([...]);
    const owned = curUser.ownedFiles.some((el) => {
      return el.toString() === id;
    });

    if (owned) {
      // return primary url
      const url = await signGet(`uploads/user-uploads/${id}.pdf`, false);
      return NextResponse.json({
        message: "success",
        status: 200,
        data,
        url,
      });
    } else {
      // return secondary url
      const url = await signGet(`uploads/user-uploads/${id}.pdf`, true);
      return NextResponse.json({
        message: "success",
        status: 200,
        data,
        url,
      });
    }
    return NextResponse.json({
      message: "success",
      status: 200,
      data,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      message: "fail",
      status: 500,
    });
  }
};
