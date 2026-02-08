"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { submitTask } from "@/services/task.service";
import { uploadFile, deleteFile } from "@/services/file.service";
import { Loader2, Send, Upload, X } from "lucide-react";

interface SubmitTaskModalProps {
    taskId: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function SubmitTaskModal({ taskId, open, onOpenChange }: SubmitTaskModalProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [fileUploading, setFileUploading] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState<{ id: string; name: string }[]>([]);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
    });

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setFileUploading(true);
        const file = files[0];

        try {
            const formData = new FormData();
            formData.append("file", file);

            const result = await uploadFile(formData);

            if (result.success && result.file) {
                setUploadedFiles(prev => [
                    ...prev,
                    { id: result.file!.id, name: file.name }
                ]);
                toast.success("File uploaded successfully");
            } else {
                toast.error(result.message || "Failed to upload file");
            }
        } catch (error) {
            toast.error("An error occurred while uploading the file");
        } finally {
            setFileUploading(false);
            e.target.value = "";
        }
    };

    const handleRemoveFile = async (fileId: string) => {
        try {
            const result = await deleteFile(fileId);
            if (result.success) {
                setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
                toast.success("File removed");
            } else {
                toast.error("Failed to remove file");
            }
        } catch (error) {
            toast.error("An error occurred while removing the file");
        }
    };

    const handleSubmit = async (finalSubmit: boolean) => {
        if (!formData.title.trim()) {
            toast.error("Submission title is required");
            return;
        }

        setLoading(true);

        const submissionData: any = {
            taskId,
            title: formData.title.trim(),
            finalSubmit,
        };

        if (formData.description.trim()) {
            submissionData.description = formData.description.trim();
        }

        if (uploadedFiles.length > 0) {
            submissionData.fileIds = uploadedFiles.map(f => f.id);
        }

        const result = await submitTask(submissionData);

        if (result.success) {
            toast.success(result.message || (finalSubmit ? "Task submitted successfully" : "Draft saved successfully"));
            onOpenChange(false);
            setFormData({ title: "", description: "" });
            setUploadedFiles([]);
            router.refresh();
        } else {
            toast.error(result.message || "Failed to submit task");
        }

        setLoading(false);
    };

    const handleClose = () => {
        if (!loading && !fileUploading) {
            setFormData({ title: "", description: "" });
            setUploadedFiles([]);
            onOpenChange(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[525px] max-h-[90vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Send className="h-5 w-5 text-primary" />
                        Submit Task
                    </DialogTitle>
                    <DialogDescription>
                        Submit your work for this task. You can save as draft or submit as final.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="title">
                            Submission Title <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="title"
                            value={formData.title}
                            onChange={(e) =>
                                setFormData({ ...formData, title: e.target.value })
                            }
                            placeholder="Briefly describe your submission"
                            required
                            disabled={loading || fileUploading}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="description">Description (Optional)</Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({ ...formData, description: e.target.value })
                            }
                            placeholder="Add details about your work..."
                            rows={4}
                            disabled={loading || fileUploading}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label>Attachments (Optional)</Label>
                        <div className="border-2 border-dashed rounded-lg p-4 space-y-3">
                            <Input
                                id="file-upload"
                                type="file"
                                onChange={handleFileUpload}
                                disabled={loading || fileUploading}
                                className="cursor-pointer"
                            />

                            {uploadedFiles.length > 0 && (
                                <div className="space-y-2">
                                    {uploadedFiles.map((file) => (
                                        <div
                                            key={file.id}
                                            className="flex items-center justify-between p-2 bg-muted rounded"
                                        >
                                            <span className="text-sm truncate">{file.name}</span>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleRemoveFile(file.id)}
                                                disabled={loading || fileUploading}
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {fileUploading && (
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Uploading file...
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <DialogFooter className="gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleClose}
                        disabled={loading || fileUploading}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() => handleSubmit(false)}
                        disabled={loading || fileUploading}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            "Save Draft"
                        )}
                    </Button>
                    <Button
                        type="button"
                        onClick={() => handleSubmit(true)}
                        disabled={loading || fileUploading}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Submitting...
                            </>
                        ) : (
                            "Submit Final"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
