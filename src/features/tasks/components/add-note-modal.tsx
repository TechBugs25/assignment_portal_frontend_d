"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle, Loader2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { addTaskSubmissionNote } from "@/services/task.service";
import { toast } from "sonner";

interface AddNoteModalProps {
    submissionId: string;
}

export function AddNoteModal({ submissionId }: AddNoteModalProps) {
    const [open, setOpen] = useState(false);
    const [note, setNote] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async () => {
        if (!note.trim()) return;

        setIsLoading(true);
        try {
            const response = await addTaskSubmissionNote(submissionId, note);

            if (response.success) {
                toast.success(response.message);
                setOpen(false);
                setNote("");
                router.refresh();
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                    <Plus className="mr-1 h-3 w-3" />
                    Add Note
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Note</DialogTitle>
                    <DialogDescription>
                        Add a note to this submission.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex items-start gap-3 rounded-md border border-yellow-200 bg-yellow-50 p-4 text-yellow-800 dark:border-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
                    <AlertTriangle className="h-5 w-5 mt-0.5" />
                    <div className="flex-1">
                        <h5 className="mb-1 font-medium leading-none tracking-tight">Warning</h5>
                        <div className="text-sm opacity-90">
                            This note isn't editable. Please recheck this before submitting.
                        </div>
                    </div>
                </div>

                <div className="grid gap-4 py-4">
                    <Textarea
                        placeholder="Type your note here..."
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="min-h-[100px]"
                    />
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)} disabled={isLoading}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} disabled={isLoading || !note.trim()}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Add Note
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
