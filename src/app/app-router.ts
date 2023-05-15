import { Routes } from "@angular/router";

export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'pages',
        pathMatch: 'full'
    },
    {path: 'pages', loadChildren: () => import('./_pages/users/users.module').then(m => m.UsersModule)},
];