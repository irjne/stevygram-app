import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'src/app/modules/chat';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/modules/user';
import { Socket } from 'ngx-socket-io';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-chat-details',
  templateUrl: './chat-details.page.html',
  styleUrls: ['./chat-details.page.scss'],
})
export class ChatDetailsPage implements OnInit {
  sub;
  id;
  name;
  messages: Message[];
  body;
  chat;

  constructor(private chatService: ChatService, private activatedRouter: ActivatedRoute, private userService: UserService, private router: Router, private socket: Socket, private toastCtrl: ToastController) { }
  ionViewWillLeave() {
    this.socket.disconnect();
  }

  async showToast(msg) {
    let toast = await this.toastCtrl.create({
      message: msg,
      position: "top",
      duration: 2000
    });
    toast.present();
  }
  async ngOnInit() {
    // this.socket.connect();
    // console.log("this.socket.connect(): " + this.socket.connect());
    // this.socket.emit('set-name', localStorage.getItem('userOnSession'));
    // this.socket.fromEvent('message').subscribe((message: Message) => {
    //   this.messages.push(message);
    // });



    this.sub = this.activatedRouter.params.subscribe(async params => {
      this.id = params['id'];
      this.chat = await this.chatService.getChatById(this.id)
      this.name = this.chat.name;
      this.messages = this.chat.messages;


      // socket playground 
      this.socket.connect();

      this.socket.emit("add-message", this.chat);

      this.socket.fromEvent("add-message").subscribe(async data => {
        this.chat = await this.chatService.getChatById(
          this.chat.id
        );
        this.showToast(data["event"]);
      });

      for (let i = 0; i < this.messages.length; i++) {
        let message = this.messages[i];
        let senders: User[] = await this.userService.getUserByPhone(message.sender);
        let userOnSession: User[] = await this.userService.getUserByPhone(localStorage.getItem('userOnSession'));
        let userOnSessionPhonebook = userOnSession[0].phonebook;
        let sender: String;

        // if the sender is the user on session
        if (senders[0].phone == localStorage.getItem('userOnSession')) {
          sender = "Me";
        }
        // if the sender is different from user on session and he isn't in his phonebook
        else if (!userOnSessionPhonebook.includes(senders[0].phone)) {
          sender = `${senders[0].nickname}`;
        }
        else {
          sender = `${senders[0].name} ${senders[0].surname}`;
        }
        message.sender = sender;
      }
    })
  }

  async sendMessage() {
    await this.chatService.addMessage(this.id, this.body);
    this.socket.emit('add-message', { text: this.body });
    console.log(this.socket.emit('add-message', { text: this.body }));
    this.body = "";
    this.ngOnInit();
  }



  async removeChat() {
    await this.chatService.deleteChat(this.id);
    this.redirectToChats();
  }


  redirectToChats() {
    this.router.navigate(['tabs/chats']);
  }
}