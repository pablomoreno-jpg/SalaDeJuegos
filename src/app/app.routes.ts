import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Home } from './components/home/home';
import { QuienSoy } from './components/quien-soy/quien-soy';
import { Registro } from './components/registro/registro';
import { Ahorcado } from './components/ahorcado/ahorcado';
import {MayorMenor} from './components/mayor-menor/mayor-menor';
import { authGuard } from './guard/auth';


export const routes: Routes = [

    { path: 'login', component: Login },
    { path: 'registro', component: Registro },
    {
        path: 'home',
        component: Home,
        children: [
            { path: 'quienSoy', component: QuienSoy, canActivate: [authGuard] },
            { path: 'ahorcado', component: Ahorcado, canActivate: [authGuard] },
            { path: 'mayorMenor', component: MayorMenor, canActivate: [authGuard] }
        ]

    },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home' },

];
