import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Home } from './components/home/home';
import { QuienSoy } from './components/quien-soy/quien-soy';
import { Registro } from './components/registro/registro';
import { Ahorcado } from './components/ahorcado/ahorcado';
import { MayorMenor } from './components/mayor-menor/mayor-menor';
import { authGuard, noAuthGuard } from './guard/auth';


export const routes: Routes = [

    { path: 'login', component: Login, canActivate: [noAuthGuard] },
    { path: 'registro', component: Registro, canActivate: [noAuthGuard] },
    {
        path: 'home',
        component: Home,
        canActivate: [authGuard],
        children: [
            { path: 'quienSoy', component: QuienSoy },
            { path: 'ahorcado', component: Ahorcado },
            { path: 'mayorMenor', component: MayorMenor }
        ]

    },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home' },

];
