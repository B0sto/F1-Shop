import { z } from "zod";

const isNotExpired = (value: string) => {
    const match = value.match(/^(\d{2})\/(\d{2})$/);
    if (!match) return false;

    const month = Number(match[1]);
    const year = Number(`20${match[2]}`);

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    if (year < currentYear) return false;
    if (year === currentYear && month < currentMonth) return false;

    return true;
};

export const detailsSchema = z.object({
    cardNumber: z
        .string()
        .min(1, "Card number is required")
        .regex(/^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/, "Invalid card number"),
    cvv: z
        .string()
        .regex(/^\d{3}$/, "Invalid CVV"),
    expirationDate: z
        .string()
        .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Format must be MM/YY")
        .refine(isNotExpired, "Card has expired"),
});

export type DetailsForm = z.infer<typeof detailsSchema>;

export const verificationSchema = z.object({
    verificationCode: z
        .string()
        .regex(/^\d{5}$/, "Enter the 5-digit code"),
});

export type VerificationForm = z.infer<typeof verificationSchema>;