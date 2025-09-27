

export interface UserDetailType {
    userId: string,
    email: string,
    role: 'admin' | 'regular'
}

export interface ResumeType {
    resumeId: string,
    link: string,
    name: string,
    ownerId: string,
    size: number,
    updatedAt: string,
    status: 'Pending' | 'Approved' | 'Rejected' | 'Needs Revision',
    ownerName: string,
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

export type TokenData = {
    user_id: string
    token: string
    expires_at: Date
}