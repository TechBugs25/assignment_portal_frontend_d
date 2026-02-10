"use client";

import { Button } from "@/components/ui/button";
import { reviewTaskSubmission } from "@/services/task.service";
import { Check, Loader2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface ReviewSubmissionButtonsProps {
    submissionId: string;
    onReviewComplete?: () => void;
}

export function ReviewSubmissionButtons({ submissionId, onReviewComplete }: ReviewSubmissionButtonsProps) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleReview = async (status: 'approved' | 'rejected') => {
        setIsLoading(true);
        try {
            const response = await reviewTaskSubmission(submissionId, status);
            if (response.success) {
                toast.success(response.message);
                router.refresh();
                if (onReviewComplete) {
                    onReviewComplete();
                }
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
        <div className="flex items-center gap-2">
            <Button
                variant="outline"
                size="sm"
                className="h-8 px-2 text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200 dark:border-green-800 dark:hover:bg-green-900/20"
                onClick={() => handleReview('approved')}
                disabled={isLoading}
            >
                {isLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5 mr-1" />}
                Approve
            </Button>
            <Button
                variant="outline"
                size="sm"
                className="h-8 px-2 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 dark:border-red-800 dark:hover:bg-red-900/20"
                onClick={() => handleReview('rejected')}
                disabled={isLoading}
            >
                {isLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <X className="h-3.5 w-3.5 mr-1" />}
                Reject
            </Button>
        </div>
    );
}
