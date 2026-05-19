import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Home } from './components/home/home';
import { QuienSoy } from './components/quien-soy/quien-soy';
import { Registro } from './components/registro/registro';

export const routes: Routes = [

    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'registro', component: Registro },
    { path: 'login', component: Login },
    { path: 'quienSoy', component: QuienSoy },
    { path: 'home', component: Home },
    { path: '**', redirectTo: 'login' }

];
