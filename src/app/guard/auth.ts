import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthServise } from "../services/auth";
import { SupabaseService } from "../services/supabaseService";


export const authGuard: CanActivateFn = async () => {

    const auth = inject(AuthServise);
    const router = inject(Router);

    await auth.chekSesion();

    if (auth.isAuthenticated()) {
        return true;

    }

    return router.navigate(['/login']);
}

export const noAuthGuard: CanActivateFn = async () => {
    const auth = inject(AuthServise);
    const router = inject(Router);

    await auth.chekSesion();

    if (!auth.isAuthenticated()) {


        return true;
    }

    return router.navigate(['/home']);;
}
export const adminGuard: CanActivateFn = async () => {

    const auth = inject(AuthServise);
    const router = inject(Router);

    const id = auth.user()?.id ?? '';

    if(await auth.esAdmin(id)){

        return true;
    }

    router.navigate(['/'])

    return false;
}