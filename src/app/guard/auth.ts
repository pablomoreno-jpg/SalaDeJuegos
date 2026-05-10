import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthServise } from "../services/auth";


export const authGuard : CanActivateFn = () => {

    const auth = inject(AuthServise);
    const router = inject(Router);

    if(auth.isAuthenticated()) return true;

    router.navigate(['/login'])

    return false;
}

