"use client";

import { Button } from "@/components/ui/button";
import { TaskDoc } from "@/features/tasks/types";
import { Download, Eye, FileText } from "lucide-react";

interface SubmissionFilesProps {
    files: TaskDoc[];
}

export function SubmissionFiles({ files }: SubmissionFilesProps) {
    if (!files || files.length === 0) return null;

    const handleDownload = (filePath: string, fileName: string) => {
        const downloadUrl = `${process.env.NEXT_PUBLIC_BACKEND_LINK || 'http://localhost:3001'}/${filePath}`;

        // Create a temporary link to trigger download
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = fileName;
        link.target = "_blank"; // Open in new tab which usually triggers download for unknown types or displays for known
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="mt-4">
            <h4 className="text-sm font-semibold text-muted-foreground mb-3">Attachments ({files.length})</h4>
            <div className="grid gap-2 sm:grid-cols-2">
                {files.map((doc) => {
                    if (!doc.file) return null;

                    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_LINK || process.env.BACKEND_LINK || 'http://localhost:3001';
                    // Ensure path logic matches backend delivery
                    const filePath = doc.file.path?.replace(/\\/g, '/') || '';
                    const fileUrl = `${backendUrl}/${filePath}`;
                    const isImage = doc.file.mimeType?.startsWith('image/') || false;

                    return (
                        <div
                            key={doc.id}
                            className="flex items-center gap-3 p-2 rounded-md border bg-background"
                        >
                            {isImage ? (
                                <img
                                    src={fileUrl}
                                    alt={doc.file.originalName || 'File'}
                                    className="w-10 h-10 object-cover rounded border"
                                />
                            ) : (
                                <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded">
                                    <FileText className="h-5 w-5 text-primary" />
                                </div>
                            )}
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate" title={doc.file.originalName}>
                                    {doc.file.originalName || 'Unknown file'}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {doc.file.sizeKb ? `${parseFloat(doc.file.sizeKb).toFixed(1)} KB` : 'Unknown size'}
                                </p>
                            </div>
                            <div className="flex gap-1">
                                {isImage && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-7 w-7"
                                        asChild
                                    >
                                        <a
                                            href={fileUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            title="View image"
                                        >
                                            <Eye className="h-3.5 w-3.5" />
                                        </a>
                                    </Button>
                                )}
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7"
                                    asChild
                                >
                                    <a
                                        href={fileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        download
                                        title="Download"
                                    >
                                        <Download className="h-3.5 w-3.5" />
                                    </a>
                                </Button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
