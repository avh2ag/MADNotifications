import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {
  OktaCallbackComponent,
  OktaAuthGuard
} from '@okta/okta-angular';
import { TextViewComponent } from './text-view/text-view.component';
import { environment } from '../environments/environment';

export function onAuthRequired({ oktaAuth, router }) {
  // Redirect the user to your custom login page
  router.navigate(['/login']);
}


const routes: Routes = [
  {
    path: '',
    redirectTo: 'v1',
    pathMatch: 'full'
  },
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
      {
        path: '',
        component: TextViewComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: environment.isUseHash })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
