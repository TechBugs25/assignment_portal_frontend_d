import Link from "next/link";
import { Profile } from "../types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EditIcon, BriefcaseIcon, CalendarIcon } from "@/components/ui/icons";

export default function ProfileHeader({ profile }: { profile: Profile }) {
    return (
        <>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
                <div>
                    <h1 className="text-4xl font-bold">User Profile</h1>
                    <p className="text-muted-foreground">
                        Detailed employee information.
                    </p>
                </div>

                <Button asChild>
                    <Link href="/dashboard/profile/edit">
                        <EditIcon className="mr-2 h-4 w-4" />
                        Edit Profile
                    </Link>
                </Button>
            </div>

            <Card className="bg-linear-to-r from-card to-muted/20 border-none">
                <CardContent
                    className="p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 text-center sm:text-left">
                    <Avatar className="h-24 w-24 sm:h-32 sm:w-32 border-4 border-background">
                        <AvatarImage src={profile.avatarUrl} />
                        <AvatarFallback>RK</AvatarFallback>
                    </Avatar>

                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <h2 className="text-3xl font-bold">{profile.name}</h2>
                            <Badge className="bg-green-100 text-green-700">
                                {profile.status}
                            </Badge>
                        </div>

                        <p className="text-primary font-bold tracking-wider">
                            {profile.id}
                        </p>

                        <div className="flex gap-6 text-sm text-muted-foreground">
                            <span className="flex items-center gap-2">
                                <BriefcaseIcon className="h-4 w-4" aria-hidden />
                                {profile.employmentType?.toLowerCase().replace(/^./, c => c.toUpperCase()) ?? "N/A"}
                            </span>
                            <span className="flex items-center gap-2">
                                <CalendarIcon className="h-4 w-4" aria-hidden />
                                Joined {profile.joinedAt}
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    );
}
