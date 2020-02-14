import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.page.html',
  styleUrls: ['./add-group.page.scss'],
})
export class AddGroupPage implements OnInit {
  name;
  description;
  users;

  constructor(private chatService: ChatService, private toastController: ToastController) { }

  ngOnInit() {
  }

  async createGroup() {
    try {
      await this.chatService.createNewChat(this.name, this.description, this.users);
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
          message: 'Your group has been created.',
          duration: 2000
        }
      )
    }
    else if (type == "fail") {
      toast = await this.toastController.create(
        {
          message: 'Your group hasn\'t been created.',
          duration: 2000
        }
      )
    }
    toast.present();
  }
}
