import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function ProfileLoading() {
    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {/* Breadcrumbs Skeleton */}
            <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-24" />
                <span className="text-muted-foreground">/</span>
                <Skeleton className="h-4 w-32" />
            </div>

            {/* Header Skeleton */}
            <div className="flex justify-between items-end">
                <div className="space-y-2">
                    <Skeleton className="h-10 w-64" />
                    <Skeleton className="h-4 w-96" />
                </div>
                <Skeleton className="h-10 w-32" />
            </div>

            {/* Hero Card Skeleton */}
            <Card className="p-8">
                <div className="flex items-center gap-8">
                    <Skeleton className="h-32 w-32 rounded-full" />
                    <div className="space-y-4 flex-1">
                        <div className="flex items-center gap-3">
                            <Skeleton className="h-8 w-48" />
                            <Skeleton className="h-6 w-20 rounded-full" />
                        </div>
                        <Skeleton className="h-5 w-24" />
                        <div className="flex gap-6">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-4 w-32" />
                        </div>
                    </div>
                </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {[...Array(2)].map((_, i) => (
                        <Card key={i}>
                            <CardHeader className="border-b pb-4 mb-4">
                                <Skeleton className="h-6 w-48" />
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {[...Array(4)].map((_, j) => (
                                        <div key={j} className="space-y-2">
                                            <Skeleton className="h-3 w-24" />
                                            <Skeleton className="h-5 w-48" />
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <div className="space-y-8">
                    <Card className="p-6 space-y-6">
                        <Skeleton className="h-4 w-24" />
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="flex justify-between items-center">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-8 w-12" />
                            </div>
                        ))}
                    </Card>
                    <Card className="p-6">
                        <Skeleton className="h-4 w-24 mb-4" />
                        <div className="flex items-center gap-4">
                            <Skeleton className="h-12 w-12 rounded-xl" />
                            <div className="space-y-2 flex-1">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-3 w-1/2" />
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
