import { options } from "@/app/api/auth/[...nextauth]/options";
import { File } from "@/lib/database/models/File";
import { User } from "@/lib/database/models/User";

import { connectToDatabase } from "@/lib/database/utils";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_PVT);

export const GET = async (request, { params }) => {
  const { id } = params;
  try {
    await connectToDatabase();
    const data1 = await getServerSession(options);

    const userId = data1?.token?.token?.user?._id;
    // retrive the information of file and current user
    // console.log("ff", );

    const file = await File.findById(id);
    const user = await User.findById(userId);
    console.log(file, user);

    if (!file || !user) throw Error("No file or user found recheck");

    // create a item to sell
    const lineItems = [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: file.title,
            images: [
              "https://cdn.paperpile.com/guides/img/reading-scientific-paper-400x400.png?v=218",
            ],
          },

          unit_amount: 1 * 100,
        },
        quantity: 1,
      },
    ];
    // create a session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      success_url: "http://localhost:3000/",
      cancel_url: "http://localhost:3000/",
      //   get customer email
      customer_email: user.email,
      client_reference_id: id,
      line_items: lineItems,
      mode: "payment",
      currency: "inr",
    });
    return NextResponse.json({
      status: "success",
      id: session.id,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      message: "fail",
      status: 500,
    });
  }
};
