import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthServise } from '../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  private auth = inject(AuthServise);

  mostrarMenu = false;
  email = '';
  password = '';
  loading = signal(false);
  errorMensaje = signal('');

  usuariosRapidos =
    [{ email: 'usuario1@gmail.com', passowrd: 'mateo1234' },
    { email: 'usuario2@gmail.com', passowrd: 'valen4567' },
    { email: 'usuario3@gmail.com', passowrd: 'lucas9877' }];


  async onSumit() {
    this.loading.set(true);

    const success = await this.auth.logIn(this.email, this.password);

    if (!success) this.errorMensaje.set('El usuario No existe');

    this.loading.set(false);
  }

  inicioRapido(index: number) {

    const user = this.usuariosRapidos[index];

    this.email = user.email;
    this.password = user.passowrd;
  }

}
