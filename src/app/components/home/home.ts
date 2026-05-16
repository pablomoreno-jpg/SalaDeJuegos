import { Component, inject, OnInit, signal } from '@angular/core';
import { Location } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthServise } from '../../services/auth';
import { effect } from "@angular/core";

@Component({
  selector: 'app-home',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  auth = inject(AuthServise);
  nombreUsuario = signal('')
  mostrar = signal(false);

  constructor(private _Location: Location) {

    effect(async () => {

      const mail = this.auth.userMail();

      if (!mail) return;

      this.nombreUsuario.set(await this.obtenerNombre(mail));
    })
  }

  async obtenerNombre(mail: string): Promise<string> {

    const usuario = await this.auth.getFullNameUser();

    if (usuario) {

      const nombre = usuario.nombre.charAt(0).toLocaleUpperCase() + usuario.nombre.slice(1).toLocaleLowerCase()
      const apellido = usuario.apellido.charAt(0).toLocaleUpperCase() + usuario.apellido.slice(1).toLocaleLowerCase()

      return nombre + ' ' + apellido;

    }

    return '';
  }

  /*
    toggleMostar() {
      this.mostrar.set(!this.mostrar());
    }
  */

  cerraSesion() {
    this.auth.logOut()
  }

}
