import { Component } from '@angular/core';
import { Chat } from '../modules/chat'
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from '../services/chat.service';
import { LoadingController } from '@ionic/angular';

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

  constructor(private router: Router, private activatedRouter: ActivatedRoute, private chatService: ChatService, public loadingController: LoadingController) { }

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

  redirectToAddChat() {
    this.router.navigate(['/add-chat']);
  }

  redirectToAddGroup() {
    this.router.navigate(['/add-group']);
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 7000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }
}
