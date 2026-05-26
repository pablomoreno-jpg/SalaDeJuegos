import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Home } from './components/home/home';
import { Registro } from './components/registro/registro';
import { authGuard, noAuthGuard } from './guard/auth';

export const routes: Routes = [

    { path: 'login', component: Login, canActivate: [noAuthGuard] },
    { path: 'registro', component: Registro, canActivate: [noAuthGuard] },
    {
        path: 'home',
        component: Home,
        canActivate: [authGuard],
        children: [
            { path: 'quienSoy', loadComponent: () => import('./components/quien-soy/quien-soy').then(c => c.QuienSoy) },
            { path: 'ahorcado', loadComponent: () => import('./components/ahorcado/ahorcado').then(c => c.Ahorcado) },
            { path: 'mayorMenor', loadComponent: () => import('./components/mayor-menor/mayor-menor').then(c => c.MayorMenor) },
            { path: 'preguntados', loadComponent: () => import('./components/preguntados/preguntados').then(c => c.Preguntados) },
            { path: 'simplebj', loadComponent: () => import('./components/simple-black-jack/simple-black-jack').then(c => c.SimpleBlackJack) },
            { path: 'listadojuegos', loadComponent: () => import('./components/listado-juegos/listado-juegos').then(c => c.ListadoJuegos) },
        ]

    },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home' },

];
