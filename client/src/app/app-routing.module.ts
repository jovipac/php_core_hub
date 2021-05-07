import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './layout/admin/admin.component';
import { AuthComponent } from './layout/auth/auth.component';
import { GuardGuard } from "../app/guard.guard";

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }, {
        path: 'dashboard',
        loadChildren: () => import('./pages/dashboard/dashboard-default/dashboard-default.module').then(m => m.DashboardDefaultModule)
      },
      {
        path: 'user',
        loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule)
      }, {
        path: 'visita',
        loadChildren: () => import('./pages/visita/visita.module').then(m => m.VisitaModule)
      }, {
        path: 'expediente',
        loadChildren: () => import('./pages/expediente/expediente.module').then(m => m.ExpedienteModule)
      },
    ],
    canActivate: [GuardGuard],
    canLoad: [GuardGuard]

  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        loadChildren: () => import('./pages/auth/login/basic-login/basic-login.module').then(m => m.BasicLoginModule)
      }
    ]
  },
  {
    path: '',
    loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
