"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { SubmitTaskModal } from "./submit-task-modal";

interface SubmitTaskButtonProps {
    taskId: string;
}

export function SubmitTaskButton({ taskId }: SubmitTaskButtonProps) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setOpen(true)} className="gap-2">
                <Send className="h-4 w-4" />
                Submit Task
            </Button>
            <SubmitTaskModal taskId={taskId} open={open} onOpenChange={setOpen} />
        </>
    );
}
