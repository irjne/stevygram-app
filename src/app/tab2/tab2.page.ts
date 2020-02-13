import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../modules/user';
import { UserService } from '../services/user.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  phonebook;
  users: User[] = [];
  sub;

  constructor(private router: Router, private activatedRouter: ActivatedRoute, private userService: UserService, private navCtrl: NavController) { }

  async ngOnInit() {
    this.phonebook = await this.userService.getUsers();
    this.phonebook = Object.values(this.phonebook[0].phonebook);
    this.phonebook = this.phonebook.splice(",");

    for (let i = 0; i < this.phonebook.length; i++) {
      let user = await this.userService.getUserByPhone(this.phonebook[i]);
      let contactInfo = Object.values(user)[0];
      let nickname = String(Object.values(contactInfo)[2]);
      let name = String(Object.values(contactInfo)[3]);
      let surname = String(Object.values(contactInfo)[4]);
      let phone = String(Object.values(contactInfo)[5]);

      this.users.push({ nickname, name, surname, phone });
    }
  }

  redirectToAddContact() {
    this.router.navigate(['/add-contact']);
  }

  async removeContact(phone: string) {
    await this.userService.removeContact(phone);
    console.log(phone);
    //this.navCtrl.setRoot(this.navCtrl.getActive().component);
    this.navCtrl.navigateRoot('tabs/users');
    // this.sub = this.activatedRouter.params.subscribe(async params => {
    //   this.ngOnInit();
    // });
  }
}
