

export interface UserDetailType {
    userId: String,
    email: String
}

// WIP: Status 
export interface ResumeType {
    resumeId: String,
    link: String,
    name: String,
    ownerId: String,
    size: Number,
    updatedAt: String,
    status: 'Pending' | 'Approved' | 'Rejected',
}

