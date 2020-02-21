import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  phone: string;
  password: string;
  token: string;

  constructor(private userService: UserService, private router: Router, private toastController: ToastController) { }

  ngOnInit() { }

  async login() {
    try {
      this.token = await this.userService.getAuthorization(this.phone, this.password);
      localStorage.setItem('token', Object.values(this.token)[1]);
      localStorage.setItem('userOnSession', this.phone);
      this.redirect();
    }
    catch (error) {
      this.token = "failed";
      this.presentToast();
      return error;
    }
  }

  redirect() {
    this.router.navigate([`tabs/chats`]);
  }

  async presentToast() {
    let toast = await this.toastController.create(
      {
        message: 'Login failed.',
        duration: 2000
      }
    )
    toast.present();
  }
}
