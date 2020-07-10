/*export interface IRequest {
    song: string;
    requestedBy: string;
}


export interface IQueueInfo{
    requests: IRequest[]
}*/

export interface IMusicData {
    title: string;
    url: string;
    requester?: { username: string, displayAvatarURL: string }
}

export interface IBotState {
    musicData: IMusicData[];
    timestamp: Date;
}