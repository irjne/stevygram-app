import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'src/app/modules/chat';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/modules/user';

@Component({
  selector: 'app-chat-details',
  templateUrl: './chat-details.page.html',
  styleUrls: ['./chat-details.page.scss'],
})
export class ChatDetailsPage implements OnInit {
  sub;
  id;
  name;
  messages: Message[];
  body;

  constructor(private chatService: ChatService, private activatedRouter: ActivatedRoute, private userService: UserService, private router: Router) { }

  async ngOnInit() {
    this.sub = this.activatedRouter.params.subscribe(async params => {
      this.id = params['id'];
      let chat = await this.chatService.getChatById(this.id)
      this.name = chat.name;
      this.messages = chat.messages;

      for (let i = 0; i < this.messages.length; i++) {
        let message = this.messages[i];
        let senders: User[] = await this.userService.getUserByPhone(message.sender);
        let userOnSession: User[] = await this.userService.getUserByPhone(localStorage.getItem('userOnSession'));
        let userOnSessionPhonebook = userOnSession[0].phonebook;
        let sender: String;

        // if the sender is the user on session
        if (senders[0].phone == localStorage.getItem('userOnSession')) {
          sender = "Me";
        }
        // if the sender is different from user on session and he isn't in his phonebook
        else if (!userOnSessionPhonebook.includes(senders[0].phone)) {
          sender = `${senders[0].nickname}`;
        }
        else {
          sender = `${senders[0].name} ${senders[0].surname}`;
        }
        message.sender = sender;
      }
    })
  }

  async sendMessage() {
    await this.chatService.addMessage(this.id, this.body);
    this.ngOnInit();
  }

  async removeChat() {
    await this.chatService.deleteChat(this.id);
    this.redirectToChats();
  }

  redirectToChats() {
    this.router.navigate(['tabs/chats']);
  }
}