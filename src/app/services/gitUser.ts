import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { desarrolador } from '../models/desarroladorModel';

@Injectable({
    providedIn: 'root',
})
export class GitUser {

    private http = inject(HttpClient);
    private URL_User = "https://api.github.com/users/pablomoreno-jpg"
    private userGIt = signal<desarrolador | null>(null)

    user = this.userGIt.asReadonly();

    obtenerUsuario(): void {

        this.http.get<any>(this.URL_User).subscribe({
            next: (data) => {
                const usurio = {
                    id: data.id,
                    nombre: data.name,
                    user: data.login,
                    email: data.email,
                    bio: data.bio,
                    avatar: data.avatar_url,
                    ubicacion: data.location,
                    creacion: data.created_at,
                };

                this.userGIt.set(usurio);
            },
            error: (error) => {
                console.log(error);

            }


        })
    }


}
