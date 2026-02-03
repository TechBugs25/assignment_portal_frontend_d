import {RECENT_IDEAS, STATS} from "@/features/dashboard/data";
import {StatCard} from "@/features/dashboard/components/stats";
import {TaskTrend} from "@/features/dashboard/components/completion-trend";
import {TeamList} from "@/features/dashboard/components/team-list";
import {Button} from "@/components/ui/button";
import {IdeaCard} from "@/features/dashboard/components/recent-ideas";


export default function DashboardPage() {
    return (
        <div className="grid grid-cols-12 gap-6">
            {/* Left Column (Stats and Charts) */}
            <div className="col-span-9 space-y-6">
                <div className="grid grid-cols-4 gap-4">
                    {STATS.map((stat, i) => (
                        <StatCard key={i} {...stat} />
                    ))}
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-semibold">Task Completion Trend</h3>
                            <p className="text-sm text-muted-foreground">Daily throughput for the current week</p>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl font-bold text-primary">84%</p>
                            <p className="text-xs text-green-500">Target: 90%</p>
                        </div>
                    </div>
                    <TaskTrend />
                </div>

                <TeamList />
            </div>

            {/* Right Column (Recent Ideas) */}
            <div className="col-span-3 bg-card border border-border rounded-xl p-6 flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-semibold text-lg">Recent Ideas</h3>
                    <Button size="icon" variant="ghost" className="h-6 w-6 bg-primary/20 text-primary hover:bg-primary/30">
                        +
                    </Button>
                </div>
                <div className="space-y-4 flex-1">
                    {RECENT_IDEAS.map((idea) => (
                        <IdeaCard image={""} key={idea.id} {...idea} />
                    ))}
                </div>
                <Button variant="ghost" className="w-full text-muted-foreground mt-6 hover:text-foreground">
                    See all submissions
                </Button>
            </div>
        </div>
    );
}