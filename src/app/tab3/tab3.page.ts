import { Component } from '@angular/core';
import { Chat } from '../modules/chat'
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  chats: Chat[];
  message: string = "";
  sub;
  id;

  constructor(private activatedRouter: ActivatedRoute, private chatService: ChatService) { }

  async ngOnInit() {
    this.sub = this.activatedRouter.params.subscribe(async params => {
      this.id = params['id'];
      this.chats = await this.chatService.getChats();
    });
  }

  async addMessage() {
    await this.chatService.addMessage(this.id, this.message);
    this.ngOnInit();
  }
}
