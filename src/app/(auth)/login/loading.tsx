import { Skeleton } from "@/components/ui/skeleton";

export default function LoginLoading() {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <header className="flex h-16 items-center justify-between border-b px-6 lg:px-40 bg-background/95 backdrop-blur">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-9 w-9 rounded-full" />
            </header>
            <main className="flex grow flex-col items-center justify-center p-6">
                <div className="w-full max-w-120 rounded-xl border bg-card p-8 pt-10 shadow-2xl">
                    <div className="flex flex-col items-center gap-6">
                        <Skeleton className="h-16 w-16 rounded-full" />
                        <div className="space-y-2 w-full text-center">
                            <Skeleton className="h-8 w-64 mx-auto" />
                            <Skeleton className="h-4 w-48 mx-auto" />
                        </div>
                        <div className="space-y-4 w-full">
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-11 w-full" />
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-11 w-full" />
                            </div>
                            <Skeleton className="h-11 w-full mt-4" />
                        </div>
                    </div>
                </div>
            </main>
            <footer className="py-6 flex justify-center">
                <Skeleton className="h-4 w-64" />
            </footer>
        </div>
    );
}
