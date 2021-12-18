import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', loadChildren: () => import('./page/home/home.module').then(m => m.HomeModule) },
  { path: 'answer', loadChildren: () => import('./page/answer/answer.module').then(m => m.AnswerModule) },
  { path: 'request', loadChildren: () => import('./page/request/request.module').then(m => m.RequestModule) },
  { path: '**', redirectTo:'', pathMatch: 'full'  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
