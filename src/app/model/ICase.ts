export interface ICase {
    id:number;
    type:string;
    agent?: string;
    createdAt?:string;
    description?:string;
    allocatedTo?:string;
    action?:string;
    respondedAt?:string;
    status?:string;
    feedback?:string;
}