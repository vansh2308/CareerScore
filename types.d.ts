

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
    ownerName: String,
    score: ScoreType
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
    structure_score: number,
    relevance_score: number,
    formatting_score: number,
    keyword_score: number
}


export interface ScoreType {
    structureScore: number,
    relevanceScore: number,
    formattingScore: number,
    keywordsScore: number
}

export interface ResumeMessage {
    by: 'admin' | 'owner',
    content: string,
    timestamp: string
}