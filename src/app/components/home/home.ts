import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { RouterLink,Router, RouterOutlet, RouterLinkWithHref, RouterLinkActive } from '@angular/router';
import { AuthServise } from '../../services/auth';
import { effect } from "@angular/core";
import { UserServices } from '../../services/usuarioService';
import { Chat } from "../chat/chat";
import { QuienSoy } from "../quien-soy/quien-soy";

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterOutlet, Chat, RouterLinkWithHref, QuienSoy, RouterLinkActive],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {


  private auth = inject(AuthServise);
  email = '';
  mostrar = signal(false);
  mostrarMenu= signal(false);

  constructor(public router: Router) {

    effect(() => {

      this.email = this.auth.userMail(); 

    })
  }


  cerrarSesion() {
    this.auth.logOut()
  }

}
