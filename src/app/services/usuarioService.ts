import { computed, inject, Inject, Injectable } from "@angular/core";
import { AuthServise } from "./auth";
import { SupabaseService } from "./supabaseService";
import { Persona } from "../models/persona";
import { juegoIterface } from '../models/juegoModel';


@Injectable({
    providedIn: 'root',
})
export class UserServices {

    private auth = inject(AuthServise);
    private supabase = inject(SupabaseService);

    idUsuario = computed(() => this.auth.user()?.id);
    emailUsuario = computed(() => this.auth.user()?.email);

    async registerNewUser(email: string, password: string, usuario: Persona): Promise<boolean> {

        const succes = await this.auth.register(email, password);

        if (succes) {

            usuario.id = succes;

            const { data, error } = await this.supabase.getCliente().from('usuarios').insert(usuario);

            if (error) {
                console.log(error.message, error.cause);
                return false;
            }

            return true;
        }

        return false;
    }

    async obtenerNombre(email: string): Promise<string> {

        const usuario = await this.auth.getFullNameUser();

        if (usuario) {

            const nombre = usuario.nombre.charAt(0).toLocaleUpperCase() + usuario.nombre.slice(1).toLocaleLowerCase()
            const apellido = usuario.apellido.charAt(0).toLocaleUpperCase() + usuario.apellido.slice(1).toLocaleLowerCase()

            return nombre + ' ' + apellido;

        }

        return '';
    }
}

@Injectable({
    providedIn: 'root',
})
export class GameService {

    private auth = inject(AuthServise);
    private supabase = inject(SupabaseService);

    async subirPuntuacionJuego(juego: juegoIterface): Promise<boolean> {

        juego.id_usuario = this.auth.user()?.id

        const { data, error } = await this.supabase.getCliente().from('gamaeScores').insert(juego);

        if (error) {

            console.log(error.message, error.cause);
            return false;
        }

        return true;

    }
}