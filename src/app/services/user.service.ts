import { Injectable } from '@angular/core';
import { User } from '../modules/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  async getUsers(): Promise<[]> {
    let token = localStorage.getItem('token');
    return this.httpClient.get<[]>(`https://stevygram.herokuapp.com/users?token=${token}`).toPromise();
  }

  async getUserByPhone(phone: String): Promise<[]> {
    let token = localStorage.getItem('token');
    return this.httpClient.get<[]>(`https://stevygram.herokuapp.com/users/${phone}?token=${token}`).toPromise();
  }

  async getAuthorization(phone: string, password: string): Promise<string> {
    return this.httpClient.post<string>(`https://stevygram.herokuapp.com/users/login`, { phone, password }).toPromise();
  }

  async addUser(name: string, surname: string, nickname: string, phone: string, password: string): Promise<string> {
    return this.httpClient.post<string>(`https://stevygram.herokuapp.com/users/`, { nickname, name, surname, phone, password }).toPromise();
  }

  async addContact(userToAdd: string): Promise<string> {
    let token = localStorage.getItem('token');
    let userOnSession = localStorage.getItem('userOnSession');
    return this.httpClient.put<string>(`https://stevygram.herokuapp.com/users/add-contact/${userOnSession}?token=${token}`, { "contact": userToAdd }).toPromise();
  }

  async removeContact(phone: string): Promise<string> {
    let token = localStorage.getItem('token');
    return this.httpClient.delete<string>(`https://stevygram.herokuapp.com/users/remove-contact/${phone}?token=${token}`).toPromise();
  }
}
