import { z } from "zod";

export const detailsSchema = z.object({
    fullName: z
        .string()
        .min(3, "Full name must be at least 3 characters")
        .max(50, "Full name is too long")
        .regex(/^[a-zA-Zა-ჰ\s]+$/, "Only letters are allowed"),
    phone: z
        .string()
        .regex(/^\+?[0-9\s()-]{9,20}$/, "Invalid phone number"),
    email: z
        .email("Invalid email address"),
    location: z
        .string()
        .min(3, "Location is required")
        .max(100, "Location is too long"),
    cardNumber: z
        .string()
        .transform((value) => value.replace(/\s/g, ""))
        .refine((value) => /^\d{16}$/.test(value), "Card number must contain 16 digits"),
    cvv: z
        .string()
        .regex(/^\d{3,4}$/, "CVV must be 3 or 4 digits"),
    expirationDate: z
        .string()
        .regex(/^(0[1-9]|1[0-2])\s?\/\s?\d{2}$/, "Expiration date must be MM / YY"),
});

export const verificationSchema = z.object({
    verificationCode: z
        .string()
        .regex(/^\d{5}$/, "Verification code must be 5 digits"),
});

export type DetailsForm = z.infer<typeof detailsSchema>;
export type VerificationForm = z.infer<typeof verificationSchema>;