import { Injectable } from '@angular/core';
import { Chat } from 'src/app/modules/chat';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private httpClient: HttpClient) { }

  async getChats(): Promise<Chat[]> {
    let token = localStorage.getItem('token');
    return this.httpClient.get<Chat[]>(`https://stevygram.herokuapp.com/chats?token=${token}`).toPromise();
  }

  async getChatById(id: number): Promise<Chat> {
    let token = localStorage.getItem('token');
    return this.httpClient.get<Chat>(`https://stevygram.herokuapp.com/chats/${id}?token=${token}`).toPromise();
  }

  async createNewChat(name: string, description: string, users: string): Promise<string> {
    let token = localStorage.getItem('token');
    return this.httpClient.post<string>(`https://stevygram.herokuapp.com/chats?token=${token}`, { name, description, users }).toPromise();
  }

  async addMessage(id, body): Promise<string> {
    let token = localStorage.getItem('token');
    let sender = localStorage.getItem('userOnSession');
    let date = new Date;
    return this.httpClient.put<string>(`https://stevygram.herokuapp.com/chats/${id}/messages?token=${token}`, { sender, body, date: date.toString() }).toPromise();
  }
}