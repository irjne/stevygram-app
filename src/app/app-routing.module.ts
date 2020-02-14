import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'add-contact',
    loadChildren: () => import('./tab2/add-contact/add-contact.module').then(m => m.AddContactPageModule)
  },
  {
    path: 'add-chat',
    loadChildren: () => import('./tab3/add-chat/add-chat.module').then(m => m.AddChatPageModule)
  },
  {
    path: 'add-group',
    loadChildren: () => import('./tab3/add-group/add-group.module').then(m => m.AddGroupPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
