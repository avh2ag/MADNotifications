import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {
  OktaCallbackComponent,
  OktaAuthGuard
} from '@okta/okta-angular';


export function onAuthRequired({ oktaAuth, router }) {
  // Redirect the user to your custom login page
  router.navigate(['/login']);
}


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'implicit/callback',
    component: OktaCallbackComponent
  },
  {
    path: 'v1',
    canActivate: [ OktaAuthGuard ],
    data: {
      onAuthRequired
    },
    children: [

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
