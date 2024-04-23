import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login-page/login-page.component';
import { PositionComponent } from './position/position.component';
export const routes: Routes = [
    //pages
    {
        path: '',
        component: LoginComponent
    },
    // {
    //     path: '',
    //     component: HomeComponent
    // },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'position',
        component: PositionComponent
    }
];
