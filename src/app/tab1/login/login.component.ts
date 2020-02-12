import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  phone: string;
  password: string;
  token: string;

  constructor(private userService: UserService, private router: Router) { }

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
      return error;
    }
  }

  redirect() {
    this.router.navigate([`tabs/chats`]);
  }
}
