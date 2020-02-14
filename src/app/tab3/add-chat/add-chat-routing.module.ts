import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddChatPage } from './add-chat.page';

const routes: Routes = [
  {
    path: '',
    component: AddChatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddChatPageRoutingModule {}
