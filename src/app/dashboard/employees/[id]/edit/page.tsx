import { getEmployeeById } from "@/services/employee.service";
import { notFound } from "next/navigation";
import { EmployeeIcon } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { EmployeeForm } from "@/features/employees/components/employee-form";

// Force dynamic rendering to fetch fresh data on each request
export const dynamic = 'force-dynamic';

interface EmployeeEditPageProps {
    params: Promise<{ id: string }>;
}

export default async function EmployeeEditPage({ params }: EmployeeEditPageProps) {
    const { id } = await params;
    const employee = await getEmployeeById(id);

    if (!employee) {
        notFound();
    }

    return (
        <div className="space-y-8 max-w-(--breakpoint-2xl) mx-auto">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href={`/dashboard/employees/${id}`}>
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                </Button>
                <div className="flex items-center gap-2 text-primary">
                    <EmployeeIcon className="h-6 w-6" />
                    <h1 className="text-3xl font-bold tracking-tight">Edit Employee</h1>
                </div>
            </div>

            <EmployeeForm employee={employee} mode="edit" />
        </div>
    );
}
