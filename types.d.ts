

export interface UserDetailType {
    userId: String,
    email: String,
    role: 'admin' | 'regular'
}

export interface ResumeType {
    resumeId: String,
    link: String,
    name: String,
    ownerId: String,
    size: Number,
    updatedAt: String,
    status: 'Pending' | 'Approved' | 'Rejected' | 'Needs Revision',
    ownerName: String
}


export interface DatabaseResumeResponse {
    id: string;
    updated_at: string;
    name: string;
    owner_id: string;
    link: string;
    size: number;
    status: 'Pending' | 'Approved' | 'Rejected' | 'Needs Revision';
    users: {
        email: string;
    };
}