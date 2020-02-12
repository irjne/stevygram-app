import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.page.html',
  styleUrls: ['./add-contact.page.scss'],
})
export class AddContactPage implements OnInit {
  phone: string;
  alert: string;

  constructor(private userService: UserService, public toastController: ToastController) { }

  ngOnInit() {
  }

  async saveOnPhonebook() {
    try {
      await this.userService.addContact(this.phone);
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
          message: 'Your contact has been saved.',
          duration: 2000
        }
      )
    }
    else if (type == "fail") {
      toast = await this.toastController.create(
        {
          message: 'Your contact hasn\'t been saved.',
          duration: 2000
        }
      )
    }
    toast.present();
  }
}
