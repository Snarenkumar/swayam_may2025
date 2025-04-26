import { z } from "zod";

// Participants Zod Schema
export const ParticipantsSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  usn: z.string(),
  college: z.string(),
  registrationId: z.string().cuid(),
});

// Registration Zod Schema
export const registrationSchema = z.object({
  id: z.string().cuid(),
  eventId: z.string(),
  userId: z.string(),
  phone: z.string(),
  usn: z.string(),
  collegeName: z.string(),
  participants: z.array(ParticipantsSchema).optional(), // if validating nested participants
  paymentAmount: z.number().optional(),
  paymentId: z.string().optional(),
  createdAt: z.date().optional(), // usually auto-handled by Prisma
  updatedAt: z.date().optional(),
  isCheckedIn: z.boolean().optional(),
  checkedInAt: z.date().optional(),
});
