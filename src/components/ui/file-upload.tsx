"use client";

import { useState, useRef, DragEvent, ChangeEvent } from "react";
import { uploadFile, deleteFile, UploadedFile } from "@/services/file.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, Upload, X, ImageIcon } from "lucide-react";

interface FileUploadProps {
    currentFileId?: string;
    currentFilePath?: string;
    onFileUploaded: (fileId: string, filePath: string) => void;
    onFileRemoved: () => void;
}

export function FileUpload({
    currentFileId,
    currentFilePath,
    onFileUploaded,
    onFileRemoved,
}: FileUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(
        currentFilePath ? `${process.env.NEXT_PUBLIC_BACKEND_LINK}/${currentFilePath.replace(/\\/g, '/')}` : null
    );
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            await handleFileUpload(files[0]);
        }
    };

    const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            await handleFileUpload(files[0]);
        }
    };

    const handleFileUpload = async (file: File) => {
        // Validate file type
        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image file");
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast.error("File size must be less than 5MB");
            return;
        }

        setIsUploading(true);

        try {
            // Delete previous file if exists
            if (currentFileId) {
                await deleteFile(currentFileId);
            }

            // Upload new file
            const formData = new FormData();
            formData.append("file", file);

            const result = await uploadFile(formData);

            if (result.success && result.file) {
                // Create preview URL
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreviewUrl(reader.result as string);
                };
                reader.readAsDataURL(file);

                onFileUploaded(result.file.id, result.file.path);
                toast.success("File uploaded successfully");
            } else {
                toast.error(result.message || "Failed to upload file");
            }
        } catch (error) {
            toast.error("An error occurred while uploading the file");
        } finally {
            setIsUploading(false);
            // Reset input
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    const handleRemove = async () => {
        if (currentFileId) {
            setIsUploading(true);
            try {
                const result = await deleteFile(currentFileId);
                if (result.success) {
                    setPreviewUrl(null);
                    onFileRemoved();
                    toast.success("File removed");
                } else {
                    toast.error(result.message || "Failed to remove file");
                }
            } catch (error) {
                toast.error("An error occurred while removing the file");
            } finally {
                setIsUploading(false);
            }
        } else {
            setPreviewUrl(null);
            onFileRemoved();
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Picture</CardTitle>
            </CardHeader>
            <CardContent>
                {previewUrl ? (
                    <div className="relative inline-block">
                        <img
                            src={previewUrl}
                            alt="Preview"
                            className="w-24 h-24 object-cover rounded-lg border"
                        />
                        <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                            onClick={handleRemove}
                            disabled={isUploading}
                        >
                            <X className="h-3 w-3" />
                        </Button>
                    </div>
                ) : (
                    <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`
                            flex flex-col items-center justify-center py-6 border-2 border-dashed rounded-lg cursor-pointer
                            transition-colors duration-200
                            ${isDragging
                                ? "border-primary bg-primary/10"
                                : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50"
                            }
                            ${isUploading ? "pointer-events-none opacity-50" : ""}
                        `}
                    >
                        {isUploading ? (
                            <>
                                <Loader2 className="h-8 w-8 text-primary animate-spin mb-2" />
                                <p className="text-sm text-muted-foreground">Uploading...</p>
                            </>
                        ) : (
                            <>
                                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mb-2">
                                    {isDragging ? (
                                        <ImageIcon className="h-5 w-5 text-primary" />
                                    ) : (
                                        <Upload className="h-5 w-5 text-primary" />
                                    )}
                                </div>
                                <p className="text-sm font-medium">
                                    {isDragging ? "Drop image here" : "Click or drag image to upload"}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    PNG, JPG, JPEG up to 5MB
                                </p>
                            </>
                        )}
                    </div>
                )}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                />
            </CardContent>
        </Card>
    );
}
