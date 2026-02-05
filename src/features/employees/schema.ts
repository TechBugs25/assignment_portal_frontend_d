import { z } from "zod";
import { Status, Gender, EmploymentType } from "./types";

const dateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "Date must be in YYYY-MM-DD format",
});

export const employeeFormSchema = z.object({
    staffId: z
        .string({ message: "Staff ID is required" })
        .min(3, { message: "Staff ID must be at least 3 characters" })
        .max(20, { message: "Staff ID is too long (max 20 characters)" }),
    firstName: z
        .string({ message: "First name is required" })
        .min(1, { message: "First name cannot be empty" })
        .max(50, { message: "First name is too long (max 50 characters)" }),
    lastName: z
        .string({ message: "Last name is required" })
        .min(1, { message: "Last name cannot be empty" })
        .max(50, { message: "Last name is too long (max 50 characters)" }),
    email: z
        .string({ message: "Email is required" })
        .email({ message: "Please enter a valid email address" }),
    mobileNumber: z.string().optional().nullable(),
    gender: z.nativeEnum(Gender, { message: "Gender is required" }),
    employmentType: z.nativeEnum(EmploymentType, { message: "Employment type is required" }),
    joinDate: dateSchema.refine((val) => new Date(val) <= new Date(), {
        message: "Join date cannot be in the future",
    }),
    lastDate: dateSchema.optional().nullable(),
    status: z.nativeEnum(Status, { message: "Status is required" }),
    departmentId: z.string().uuid().optional().nullable(),
    fileId: z.string().uuid().optional().nullable(),
}).refine(
    (data) => {
        if (!data.lastDate) return true;
        return new Date(data.lastDate) >= new Date(data.joinDate);
    },
    {
        message: "Last date cannot be before join date",
        path: ["lastDate"],
    }
);

export const updateEmployeeFormSchema = employeeFormSchema.partial().refine(
    (data) => Object.keys(data).length > 0,
    { message: "At least one field must be provided for update" }
);

export type EmployeeFormData = z.infer<typeof employeeFormSchema>;
export type UpdateEmployeeFormData = z.infer<typeof updateEmployeeFormSchema>;
