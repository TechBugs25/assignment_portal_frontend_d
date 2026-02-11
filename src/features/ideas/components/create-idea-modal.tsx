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
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Sparkles } from "lucide-react";
import { createIdea } from "@/services/idea.service";
import { toast } from "sonner";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { generateAIContent } from "@/services/ai.service";

export function CreateIdeaModal() {
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
    });
    const [aiContext, setAiContext] = useState("");
    const [aiLanguage, setAiLanguage] = useState("Bangla");
    const [isGenerating, setIsGenerating] = useState(false);

    const router = useRouter();

    const handleGenerate = async (type: 'title' | 'description') => {
        if (!aiContext) {
            toast.error("Please enter a topic for AI generation");
            return;
        }

        setIsGenerating(true);
        try {
            const prompt = type === 'title'
                ? `Give me idea title : ${aiContext}. Answer : ${aiLanguage}`
                : `Give me idea description : ${aiContext}. Answer : ${aiLanguage}`;

            const content = await generateAIContent(prompt);

            if (content) {
                setFormData(prev => ({
                    ...prev,
                    [type]: content
                }));
                toast.success(`Generated ${type} successfully`);
            }
        } catch (error) {
            toast.error("Failed to generate content");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const result = await createIdea(formData);

            if (result.success) {
                toast.success(result.message || "Idea created successfully!");
                setFormData({ title: "", description: "" });
                setAiContext("");
                setOpen(false);
                router.refresh();
            } else {
                toast.error(result.message || "Failed to create idea");
            }
        } catch (error) {
            toast.error("An unexpected error occurred");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Idea
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Create New Idea</DialogTitle>
                        <DialogDescription>
                            Share your innovative idea with the team. You can use AI to help generate content.
                        </DialogDescription>
                    </DialogHeader>

                    {/* AI Helper Section */}
                    <div className="bg-muted/50 p-4 rounded-lg mt-4 space-y-4 border">
                        <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="w-4 h-4 text-primary" />
                            <span className="font-medium text-sm">AI Assistant</span>
                        </div>

                        <div className="grid gap-4">
                            <div>
                                <Label htmlFor="ai-context">Topic / Context</Label>
                                <Input
                                    id="ai-context"
                                    placeholder="E.g., Bangladesh Match win news"
                                    value={aiContext}
                                    onChange={(e) => setAiContext(e.target.value)}
                                    className="mt-1"
                                />
                            </div>

                            <div className="flex gap-4 items-end">
                                <div className="w-[140px]">
                                    <Label>Language</Label>
                                    <Select value={aiLanguage} onValueChange={setAiLanguage}>
                                        <SelectTrigger className="mt-1">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Bangla">Bangla</SelectItem>
                                            <SelectItem value="English">English</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex gap-2 flex-1">
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        size="sm"
                                        className="flex-1"
                                        onClick={() => handleGenerate('title')}
                                        disabled={isGenerating || !aiContext}
                                    >
                                        {isGenerating ? "..." : "Generate Title"}
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        size="sm"
                                        className="flex-1"
                                        onClick={() => handleGenerate('description')}
                                        disabled={isGenerating || !aiContext}
                                    >
                                        {isGenerating ? "..." : "Generate Desc"}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">
                                Title <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="title"
                                placeholder="Enter idea title"
                                value={formData.title}
                                onChange={(e) =>
                                    setFormData({ ...formData, title: e.target.value })
                                }
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">
                                Description <span className="text-destructive">*</span>
                            </Label>
                            <Textarea
                                id="description"
                                placeholder="Describe your idea in detail"
                                value={formData.description}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                                    setFormData({ ...formData, description: e.target.value })
                                }
                                rows={5}
                                required
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Creating..." : "Create Idea"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
