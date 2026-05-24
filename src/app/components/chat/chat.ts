import { Component, computed, effect, inject, Signal, signal } from '@angular/core';
import { ChatService } from '../../services/chatService';
import { UserServices } from '../../services/usuarioService';
import { DatePipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  imports: [NgClass, FormsModule, DatePipe],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat {

  private userSv = inject(UserServices);
  chatSv = inject(ChatService);
  mensaje = ''
  emailUisiaro = '';
  idUsuario = '';
  mostrarChat = signal(false);

  constructor() {


    effect(() => {

      this.emailUisiaro = this.userSv.emailUsuario() ?? '';
      this.idUsuario = this.userSv.idUsuario() ?? '';

    });


  }

  async enviar() {

    const texto = this.mensaje.trim();

    this.chatSv.enviarMensaje(texto, this.emailUisiaro)

    this.mensaje = '';

  }


}
