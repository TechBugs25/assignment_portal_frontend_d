import { getEmployees } from "@/services/employee.service";
import { EmployeeTable } from "@/features/employees/components/employee-table";
import { EmployeeIcon } from "@/components/ui/icons";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

interface EmployeesPageProps {
    searchParams: Promise<{ page?: string }>;
}

async function EmployeesTableContent({ page }: { page: number }) {
    const { employees, meta } = await getEmployees(page);

    return <EmployeeTable employees={employees} meta={meta} />;
}

function EmployeesTableSkeleton() {
    return (
        <div className="space-y-4">
            <div className="rounded-md border">
                <div className="p-4 space-y-4">
                    <Skeleton className="h-10 w-full" />
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton key={i} className="h-12 w-full" />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default async function EmployeesPage({ searchParams }: EmployeesPageProps) {
    const params = await searchParams;
    const page = Number(params.page) || 1;

    return (
        <div className="space-y-8 max-w-(--breakpoint-2xl) mx-auto">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-primary">
                        <EmployeeIcon className="h-6 w-6" />
                        <h1 className="text-3xl font-bold tracking-tight">Employees</h1>
                    </div>
                    <p className="text-muted-foreground">
                        Manage and view all employees in the system.
                    </p>
                </div>
                <Button asChild>
                    <Link href="/dashboard/employees/add">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Employee
                    </Link>
                </Button>
            </div>

            <Suspense key={page} fallback={<EmployeesTableSkeleton />}>
                <EmployeesTableContent page={page} />
            </Suspense>
        </div>
    );
}
