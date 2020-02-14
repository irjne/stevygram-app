import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add-chat',
  templateUrl: './add-chat.page.html',
  styleUrls: ['./add-chat.page.scss'],
})
export class AddChatPage implements OnInit {
  user;

  constructor(private chatService: ChatService, private toastController: ToastController) { }

  ngOnInit() {
  }

  async createChat() {
    try {
      await this.chatService.createNewChat("Chat", "", this.user);
      this.presentToast("success");
    }
    catch (error) {
      this.presentToast("fail");
      return error;
    }
  }

  async presentToast(type: String) {
    let toast;
    if (type == "success") {
      toast = await this.toastController.create(
        {
          message: 'Your chat has been created.',
          duration: 2000
        }
      )
    }
    else if (type == "fail") {
      toast = await this.toastController.create(
        {
          message: 'Your chat hasn\'t been created.',
          duration: 2000
        }
      )
    }
    toast.present();
  }
}
