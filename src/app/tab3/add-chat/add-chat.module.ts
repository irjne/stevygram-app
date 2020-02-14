import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddChatPageRoutingModule } from './add-chat-routing.module';

import { AddChatPage } from './add-chat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddChatPageRoutingModule
  ],
  declarations: [AddChatPage]
})
export class AddChatPageModule {}
