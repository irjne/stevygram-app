import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  token;
  phone;
  password;
  name;
  nickname;
  surname;

  constructor(private toastController: ToastController, private userService: UserService) { }

  ngOnInit() {

  }

  async signUp() {
    try {
      await this.userService.addUser(this.name, this.surname, this.nickname, this.phone, this.password);
      this.presentToast("success");
    }
    catch (error) {
      this.presentToast("fail");
    }
  }

  async presentToast(type: String) {
    let toast;
    if (type == "success") {
      toast = await this.toastController.create(
        {
          message: 'Sign-up successfully.',
          duration: 2000
        }
      )
    }
    else if (type == "fail") {
      toast = await this.toastController.create(
        {
          message: 'Sign-up failed.',
          duration: 2000
        }
      )
    }
    toast.present();
  }
}
