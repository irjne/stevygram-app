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
    path: 'add-contact',
    loadChildren: () => import('./tab2/add-contact/add-contact.module').then( m => m.AddContactPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
