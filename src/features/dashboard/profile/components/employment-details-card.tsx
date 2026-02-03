import { Profile } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BriefcaseIcon } from "@/components/ui/icons";

export default function EmploymentDetailsCard({
    profile,
}: {
    profile: Profile;
}) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center gap-3">
                <BriefcaseIcon className="h-5 w-5 text-primary" />
                <CardTitle>Employment Details</CardTitle>
            </CardHeader>

            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-y-8">
                <Info label="Employee ID" value={profile.id} />
                <Info label="Department" value={profile.department} />
                <Info label="Status" value={profile.status} />
                <Info label="Join Date" value={profile.joinedAt} />
                <Info label="Last Date" value={profile.lastDate}/>
            </CardContent>
        </Card>
    );
}

function Info({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {label}
            </p>
            <p className="font-medium">{value}</p>
        </div>
    );
}
