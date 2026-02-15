export interface Employee {
    id: string;
    staffId: string;
    firstName: string;
    lastName: string;
    email: string;
    mobileNumber: string | null;
    gender: string;
    employmentType: string;
    joinDate: string;
    lastDate: string | null;
    status: string;
    profilePicture: {
        id: string;
        uniqueName: string;
        originalName: string;
        path: string;
        mimeType: string;
        sizeKb: string;
        storage: string;
        usedAt: string;
        createdAt: string;
        updatedAt: string;
    } | null;
    createdAt: string;
    updatedAt: string;
}

export interface User {
    id: string;
    failedAttemptCount: number;
    maxFailedAttempts: number;
    lockedUntil: string | null;
    employee: Employee;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export interface PaginationMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface UsersResponse {
    statusCode: number;
    users: User[];
    meta: PaginationMeta;
}
