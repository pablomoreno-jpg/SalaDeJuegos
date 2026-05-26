import { Injectable, computed, inject, signal, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SupabaseService } from "./supabaseService";
import { User } from "../models/User";

@Injectable({ providedIn: 'root' })

export class AuthServise {
    private router = inject(Router);
    private supabase = inject(SupabaseService)

    user = signal<User | null>(null);
    isAuthenticated = computed(() => this.user() !== null);
    userMail = computed(() => this.user()?.email ?? '');


    constructor() {
        this.chekSesion()

        this.supabase.getCliente().auth.onAuthStateChange((_event, session) => {


            if (session?.user) {
                this.user.set({
                    id: session.user.id,
                    email: session.user.email ?? '',
                })

                this.router.navigate(['/'])
            }
            else{
                this.user.set(null);
            }

        })

    }


    async chekSesion() {
        const { data: { session } } = await this.supabase.getCliente().auth.getSession();

        if (session?.user) {
            this.user.set({
                id: session.user.id,
                email: session.user.email ?? '',
            })
        }
        else {
            this.user.set(null)
        }
    }

    async logIn(email: string, password: string): Promise<boolean> {

        const { data, error } = await this.supabase.getCliente().auth.signInWithPassword({ email, password })

        if (error) {
            console.log(error.message);
            return false;
        };

        if (data.user) {
            this.user.set({
                id: data.user.id,
                email: data.user.email ?? ''
            })
            this.router.navigate(['/'])
            return true;
        }

        return false;


    }

    async register(emailUser: string, passwordUser: string): Promise<string | null> {

        const { data, error } = await this.supabase.getCliente().auth.signUp({
            email: emailUser,
            password: passwordUser
        })

        if (error) {
            console.log(error.message);
            return null;
        }

        return data.user?.id ?? null;


    }

    async deletUser(id: string) {

        const { data, error } = await this.supabase.getCliente().auth.admin.deleteUser(id);

        if (error) console.log(error.message);

    }

    async logOut() {
        const { error } = await this.supabase.getCliente().auth.signOut()

        if (error) console.log(error.message);

        this.user.set(null);

        this.router.navigate(['/login'])

    }

    async getFullNameUser(): Promise<{ nombre: string, apellido: string } | null> {

        const { data, error } = await this.supabase.getCliente()
            .from('usuarios').select('nombre,apellido')
            .eq('email', this.userMail()).single()

        if (error) console.log(error.message);

        return data;

    }

}

