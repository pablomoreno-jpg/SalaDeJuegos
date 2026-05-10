import { Component, inject, OnInit, signal } from '@angular/core';
import { Location } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthServise } from '../../services/auth';
import { UsuariosService } from '../../services/usuariosService';


@Component({
  selector: 'app-home',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {

  auth = inject(AuthServise);
  nombreUsuario = signal('')
  mostrar = signal(false);
  usuario = inject(UsuariosService);

  constructor(private _Location: Location) { }

  async ngOnInit(){

    this.nombreUsuario.set(await this.obtenerNombre())

  }

  async obtenerNombre(): Promise<string> {

    const usuario = await this.usuario.getFullName(this.auth.userMail());

    if (usuario) {

      const nombre = usuario.nombre.charAt(0).toLocaleUpperCase() + usuario.nombre.slice(1).toLocaleLowerCase()
      const apellido = usuario.apellido.charAt(0).toLocaleUpperCase() + usuario.apellido.slice(1).toLocaleLowerCase()

      return nombre + ' ' + apellido;

    }

    return '';
  }


  toggleMostar() {
    this.mostrar.set(!this.mostrar());
  }


  cerraSesion() {
    this.auth.logOut()
  }

}
