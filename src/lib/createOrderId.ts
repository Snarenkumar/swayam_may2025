import axios from "axios";

export async function createOrderId(amount: number) {
  try {
    const response = await axios.post("/api/createOrder", {
      amount: amount * 100,
    });

    return response.data.orderId;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create order");
  }
}
