import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat-details',
  templateUrl: './chat-details.page.html',
  styleUrls: ['./chat-details.page.scss'],
})
export class ChatDetailsPage implements OnInit {
  sub;
  id;
  name;
  messages;

  constructor(private chatService: ChatService, private activatedRouter: ActivatedRoute) { }

  async ngOnInit() {
    this.sub = this.activatedRouter.params.subscribe(async params => {
      this.id = params['id'];
      let chat = await this.chatService.getChatById(this.id)
      this.name = chat.name;
      this.messages = chat.messages;
    })
  }
}