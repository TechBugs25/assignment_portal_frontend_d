"use server";

import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";
import { Employee, PaginationMeta, EmployeesResponse } from "@/features/employees/types";

export interface GetEmployeesResult {
    employees: Employee[];
    meta: PaginationMeta;
}

export async function getEmployees(page: number = 1, limit: number = 10): Promise<GetEmployeesResult> {
    const baseUrl = process.env.BACKEND_LINK;
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;
    const session = await decrypt(sessionCookie);

    const emptyResult: GetEmployeesResult = {
        employees: [],
        meta: { page: 1, limit: 10, total: 0, totalPages: 0 }
    };

    if (!session?.accessToken) {
        return emptyResult;
    }

    try {
        const response = await fetch(`${baseUrl}/employee?page=${page}&limit=${limit}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${session.accessToken}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            console.error("Failed to fetch employees:", response.statusText);
            return emptyResult;
        }

        const data: EmployeesResponse = await response.json();

        return {
            employees: data.data || [],
            meta: data.meta || { page: 1, limit: 10, total: 0, totalPages: 0 }
        };
    } catch (error) {
        console.error("Error fetching employees list:", error);
        return emptyResult;
    }
}

export async function getEmployeeById(id: string): Promise<Employee | null> {
    const baseUrl = process.env.BACKEND_LINK;
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;
    const session = await decrypt(sessionCookie);

    if (!session?.accessToken) {
        return null;
    }

    try {
        const response = await fetch(`${baseUrl}/employee/${id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${session.accessToken}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            console.error("Failed to fetch employee:", response.statusText);
            return null;
        }

        const data = await response.json();
        return data.employee || null;
    } catch (error) {
        console.error("Error fetching employee:", error);
        return null;
    }
}

export interface ApiResponse {
    success: boolean;
    message?: string;
    errors?: Record<string, string[]>;
}

export async function createEmployee(employeeData: Record<string, unknown>): Promise<ApiResponse> {
    const baseUrl = process.env.BACKEND_LINK;
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;
    const session = await decrypt(sessionCookie);

    if (!session?.accessToken) {
        return { success: false, message: "Unauthorized" };
    }

    try {
        const response = await fetch(`${baseUrl}/employee`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${session.accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(employeeData),
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: data.message || "Failed to create employee",
                errors: data.errors,
            };
        }

        return { success: true, message: "Employee created successfully" };
    } catch (error) {
        console.error("Error creating employee:", error);
        return { success: false, message: "An error occurred while creating the employee" };
    }
}

export async function updateEmployee(id: string, employeeData: Record<string, unknown>): Promise<ApiResponse> {
    const baseUrl = process.env.BACKEND_LINK;
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;
    const session = await decrypt(sessionCookie);

    if (!session?.accessToken) {
        return { success: false, message: "Unauthorized" };
    }

    try {
        const response = await fetch(`${baseUrl}/employee/${id}`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${session.accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(employeeData),
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: data.message || "Failed to update employee",
                errors: data.errors,
            };
        }

        return { success: true, message: "Employee updated successfully" };
    } catch (error) {
        console.error("Error updating employee:", error);
        return { success: false, message: "An error occurred while updating the employee" };
    }
}
