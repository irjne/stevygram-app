import { User } from './user';

export interface Message {
    sender: string;
    body: string;
    date: Date;
}

export interface Chat {
    id: number;
    name: string;
    description: string;
    users: string[];
    messages: Message[];
    lastMessage: Message
}