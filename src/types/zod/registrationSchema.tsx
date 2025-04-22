import { z } from "zod";

// Define the Registration schema
export const registrationSchema = z.object({
  eventId: z.string(),
  userId: z.string(),
  phone: z.string(),
  usn: z.string(),
  collegeName: z.string(),
  paymentAmount: z.number().optional(),
  paymentId: z.string().optional(),
  isCheckedIn: z.boolean().optional().default(false),
  checkedInAt: z.coerce.date().optional(),
});
