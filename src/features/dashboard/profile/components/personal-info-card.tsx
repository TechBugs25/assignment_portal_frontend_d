import {Profile} from "../types";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {UserIcon} from "@/components/ui/icons";

export default function PersonalInfoCard({
                                             profile,
                                         }: {
    profile: Profile;
}) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center gap-3">
                <UserIcon className="h-5 w-5 text-primary"/>
                <CardTitle>User Information</CardTitle>
            </CardHeader>

            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-y-8">
                <Info label="Full Name" value={profile.name}/>
                <Info label="Gender"
                      value={profile.gender?.toLowerCase().replace(/^./, c => c.toUpperCase()) ?? "N/A"}/>
                <Info label="Email" value={profile.email}/>
                <Info label="Phone" value={profile.phone}/>
            </CardContent>
        </Card>
    );
}

function Info({label, value}: { label: string; value: string }) {
    return (
        <div>
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {label}
            </p>
            <p className="font-medium">{value}</p>
        </div>
    );
}
