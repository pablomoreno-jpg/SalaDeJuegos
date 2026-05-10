import { SupabaseService } from "./supabaseService";
import { inject , Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {

    private supabase = inject(SupabaseService);

    async getFullName(email: string): Promise<{ nombre: string, apellido: string } | null> {

        const { data, error } = await this.supabase.getCliente()
            .from('usuarios').select('nombre,apellido')
            .eq('email', email).single()

        if (error) console.log(error.message);

        return data;

    }



}