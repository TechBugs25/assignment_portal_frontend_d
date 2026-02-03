import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StarIcon } from "@/components/ui/icons";

export default function QuickStatsCard() {
    return (
        <Card className="border shadow-md bg-card text-card-foreground">
            <CardHeader>
                <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Quick Stats
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
                <Stat label="Stories Published" value="128" />
                <Stat label="Active Tasks" value="4" />

                <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Review Rating</span>
                    <div className="flex items-center gap-1">
                        <span className="text-2xl font-bold text-yellow-500">4.9</span>
                        <StarIcon
                            className="h-4 w-4 fill-yellow-500 text-yellow-500"
                            aria-hidden
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function Stat({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex justify-between items-center">
            <span className="text-muted-foreground">{label}</span>
            <span className="text-2xl font-bold">{value}</span>
        </div>
    );
}
