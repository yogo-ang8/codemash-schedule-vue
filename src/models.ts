export interface BaseSession {
    id: string;
    title: string;
    track: string;
    tags: string[];
    format: string;
    level: string;
    day: string;
    startTime: string;
    endTime: string;
    excerpt: string;

}

export interface SessionOverview extends BaseSession {
    speakers: string[];
}

export interface SessionDetail extends BaseSession {
    description: string;
    speakers: Speaker[];
}

export interface Speaker {
    name: string,
    photo: string,
    bio: string,
    links: SpeakerLink[]
}

export interface SpeakerLink {
    title: string,
    url: string
}