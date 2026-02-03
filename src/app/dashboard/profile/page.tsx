import {getProfile} from "@/features/dashboard/profile/data";
import ProfileHeader from "@/features/dashboard/profile/components/profile-header";
import PersonalInfoCard from "@/features/dashboard/profile/components/personal-info-card";
import EmploymentDetailsCard from "@/features/dashboard/profile/components/employment-details-card";
import QuickStatsCard from "@/features/dashboard/profile/components/quick-stats-card";

export default async function ProfilePage() {
    const profile = await getProfile();

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <ProfileHeader profile={profile}/>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <PersonalInfoCard profile={profile}/>
                    <EmploymentDetailsCard profile={profile}/>
                </div>

                <div className="col-span-1 space-y-8">
                    <QuickStatsCard/>
                </div>
            </div>

            <footer className="pt-12 pb-6 text-center text-xs text-muted-foreground border-t">
                © 2026 News Office Management System. All rights reserved.
            </footer>
        </div>
    );
}
