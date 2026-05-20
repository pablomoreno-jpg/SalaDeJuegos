import { Component, inject, signal } from '@angular/core';
import { Persona } from '../../models/persona';
import { AuthServise } from '../../services/auth';
import { SupabaseService } from '../../services/supabaseService';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-registro',
  imports: [FormsModule, CommonModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {

  private auth = inject(AuthServise);
  private supabase = inject(SupabaseService)
  private rotuer = inject(Router);
  loading = signal(false);
  errorMensaje = signal('');

  nombre: string = '';
  apellido: string = '';
  email: string = '';
  edad: number = 0;
  password: string = ''
  passwordConfirm: string = '';

  constructor(private _location: Location){}

  async onSumit() {

    this.loading.set(true);

    const succes = await this.auth.register(this.email, this.password);

    if (succes) {

      const usuario: Persona = {
        nombre: this.nombre,
        apellido: this.apellido,
        email: this.email,
        edad: this.edad,
      }

      const { data, error } = await this.supabase.getCliente().from('usuarios').insert(usuario);

      if (error) console.log(error.message, error.cause);

      else {
        this.rotuer.navigate(['/login'])
      }


    }
    else {

      this.errorMensaje.set('El email ya existe en la pagina');
    }

    this.loading.set(false);
  }


  volver(){
    this._location.back();
  }


}
