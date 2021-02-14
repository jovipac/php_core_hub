import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        data: {
            breadcrumb: 'Usuarios',
            status: false
        },
        children: [
            {
                path: 'list-user',
                loadChildren: () => import('./list/list.module').then(m => m.ListModule)
            },
            {
                path: 'profile',
                loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
            },
            {
                path: 'maintance-profile',
                loadChildren: () => import('./maintance-profile/maintance-profile.module').then(m => m.MaintanceProfileModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }
