import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { User } from "@/lib/database/models/User";
import { connectToDatabase } from "@/lib/database/utils";
export const POST = async (request) => {
  try {
    let { email, name, password, passwordrepeat } = await request.json();
    if (password !== passwordrepeat) {
      return NextResponse.json({
        status: 400,
        message: "Password do not match",
      });
    }
    await connectToDatabase();
    const duplicate = await User.findOne({ email });

    if (duplicate) {
      return NextResponse.json({ message: "Duplicate Email", status: 409 });
    }

    password = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      name,
      password,
    });

    await user.save();
    return NextResponse.json({ message: "success", status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      message: "something went wrong",
      status: 500,
    });
  }
};
