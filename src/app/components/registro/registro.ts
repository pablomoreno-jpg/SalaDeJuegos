import { Component, inject, signal } from '@angular/core';
import { Persona } from '../../models/persona';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UserServices } from '../../services/usuarioService';

@Component({
  selector: 'app-registro',
  imports: [FormsModule, CommonModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {

  private userServices = inject(UserServices);
  private rotuer = inject(Router);
  loading = signal(false);
  errorMensaje = signal('');

  nombre: string = '';
  apellido: string = '';
  email: string = '';
  edad: number = 0;
  password: string = ''
  passwordConfirm: string = '';

  constructor(private _location: Location) { }

  async onSumit() {

    this.loading.set(true);

    const usuario: Persona = {
      nombre: this.nombre,
      apellido: this.apellido,
      email: this.email,
      edad: this.edad,
    }

    const succes = await this.userServices.registerNewUser(this.email, this.password, usuario);

    if (succes) {

      this.rotuer.navigate(['/login'])

    }
    else {

      this.errorMensaje.set('Error al intentar registrar su usuario');
    }

    this.loading.set(false);
  }

  async subirPuntuancionJuego(){
    
    
  
  }

  volver() {
    this._location.back();
  }


}
