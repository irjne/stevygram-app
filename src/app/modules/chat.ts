import { User } from './user';

export interface Message {
    sender: String;
    body: String;
    date: Date;
}

export interface Chat {
    id: number;
    name: String;
    description: String;
    users: String[];
    messages: Message[];
    lastMessage: Message
}