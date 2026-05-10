import { Injectable, Inject, Signal, computed, effect, inject, signal } from "@angular/core";
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
        this.chekSesion();
    }


    async chekSesion() {
        const { data: { session } } = await this.supabase.getCliente().auth.getSession();

        if (session?.user) {
            this.user.set({
                id: session.user.id,
                email: session.user.email ?? '',
            })
        }
    }

    async logIn(email: string, password: string): Promise<boolean> {

        const { data, error } = await this.supabase.getCliente().auth.signInWithPassword({ email, password })

        if (error) console.log(error.message);

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

    async register(emailUser: string, passwordUser: string): Promise<boolean> {

        const { data, error } = await this.supabase.getCliente().auth.signUp({
            email: emailUser,
            password: passwordUser
        })

        if (error) {
            console.log(error.message);
            return false;
        }

        return true;


    }

    async deletUser(id: string) {

        const { data, error } = await this.supabase.getCliente().auth.admin.deleteUser(id);

        if (error) console.log(error.message);

    }


    async logOut() {
        const { error } = await this.supabase.getCliente().auth.signOut()

        if (error) console.log(error.message);

        this.router.navigate(['/login'])

    }
}

