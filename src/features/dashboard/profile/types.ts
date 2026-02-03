export interface Profile {
    id: string;
    name: string;
    email: string;
    phone: string;
    gender: string;
    status: "ACTIVE" | "INACTIVE";
    employmentType: string;
    joinedAt: string;
    lastDate: string;
    department: string;
    avatarUrl: string;
}
