import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const key_id = process.env.RAZORPAY_KEY_ID as string;
const key_secret = process.env.RAZORPAY_KEY_SECRET as string;

if (!key_id || !key_secret) {
  throw new Error("Razorpay keys are missing");
}

const razorpay = new Razorpay({
  key_id,
  key_secret,
});

export type OrderBody = {
  amount: number;
};

export async function POST(request: NextRequest) {
  try {
    const { amount }: OrderBody = await request.json();
    if (!amount) {
      return NextResponse.json(
        { message: `Amount is required` },
        { status: 400 }
      );
    }

    const options = {
      amount,
      currency: "INR",
      receipt: `receipt#${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    return NextResponse.json({ orderId: order.id }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error", error },
      { status: 500 }
    );
  }
}
