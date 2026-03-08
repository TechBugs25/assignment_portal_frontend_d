import TaskForm from "@/features/tasks/components/task-form";
import { Suspense } from "react";

export default function AddTaskPage() {
    return (
        <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Loading form...</div>}>
            <TaskForm />
        </Suspense>
    );
}
