import stripe from "stripe";
import { NextResponse } from "next/server";
import { createOrder } from "@/lib/services/createBooking";
export const POST = async (request) => {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    try {
      event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    } catch (err) {
      return NextResponse.json({ message: "Webhook error", error: err });
    }

    const eventType = event.type;

    // CREATE
    if (eventType === "checkout.session.completed") {
      const { customer_email, client_reference_id } = event.data.object;
      await createOrder({ customer_email, client_reference_id });
      return NextResponse.json({ message: "Webhook error", status: 201 });
    }
  } catch (err) {
    return NextResponse.json({ message: "Webhook error", error: err });
  }
};
