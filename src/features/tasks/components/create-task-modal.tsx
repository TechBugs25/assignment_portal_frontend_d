"use client";

import { useState, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import TaskForm from "./task-form";

interface CreateTaskModalProps {
    trigger?: ReactNode;
    initialIdeaId?: string;
    initialIdeaTitle?: string;
}

export function CreateTaskModal({ trigger, initialIdeaId, initialIdeaTitle }: CreateTaskModalProps = {}) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button className="gap-2">
                        <Plus className="h-4 w-4" />
                        Create Task
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Create New Task</DialogTitle>
                    <DialogDescription>
                        Fill in the details below to create a new task.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-2">
                    <TaskForm
                        onSuccess={() => setOpen(false)}
                        onCancel={() => setOpen(false)}
                        initialIdeaId={initialIdeaId}
                        initialIdeaTitle={initialIdeaTitle}
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}
