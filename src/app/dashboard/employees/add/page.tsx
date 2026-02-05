import { EmployeeIcon } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { EmployeeForm } from "@/features/employees/components/employee-form";

export default function AddEmployeePage() {
    return (
        <div className="space-y-8 max-w-(--breakpoint-2xl) mx-auto">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/dashboard/employees">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                </Button>
                <div className="flex items-center gap-2 text-primary">
                    <EmployeeIcon className="h-6 w-6" />
                    <h1 className="text-3xl font-bold tracking-tight">Add New Employee</h1>
                </div>
            </div>

            <EmployeeForm mode="create" />
        </div>
    );
}
