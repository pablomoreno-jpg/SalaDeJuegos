import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { RouterLink, Router, RouterOutlet, RouterLinkWithHref, RouterLinkActive } from '@angular/router';
import { AuthServise } from '../../services/auth';
import { effect } from "@angular/core";
import { UserServices } from '../../services/usuarioService';
import { Chat } from "../chat/chat";
import { QuienSoy } from "../quien-soy/quien-soy";
import {
  trigger,
  transition,
  style,
  animate,
  query,
  group
} from '@angular/animations';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterOutlet, Chat, RouterLinkWithHref, QuienSoy, RouterLinkActive],
  templateUrl: './home.html',
  styleUrl: './home.css',
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        query(':enter, :leave', [
          style({
            position: 'absolute',
            width: '100%'
          })
        ], { optional: true }),

        group([
          query(':leave', [
            animate('250ms ease',
              style({
                opacity: 0,
                transform: 'translateX(-20px)'
              })
            )
          ], { optional: true }),
          query(':enter', [
            style({
              opacity: 0,
              transform: 'translateX(20px)'
            }),
            animate('250ms ease',
              style({
                opacity: 1,
                transform: 'translateX(0)'
              })
            )
          ], { optional: true })

        ])

      ])

    ])

  ]
})
export class Home implements OnInit {


  private auth = inject(AuthServise);
  router = inject(Router);
  email = '';
  mostrar = signal(false);
  mostrarMenu = signal(false);
  isAdmin = signal(false);

  constructor() {

    effect(() => {

      this.email = this.auth.userMail();

    })
  }


  async ngOnInit() {
    const id = this.auth.user()?.id;

    if (id) {

      const admin = await this.auth.esAdmin(id);

      this.isAdmin.set(admin);

    }
  }

  cerrarSesion() {
    this.auth.logOut()
  }

}
