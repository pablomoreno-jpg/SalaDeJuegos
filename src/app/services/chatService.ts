import { Injectable, inject, signal } from '@angular/core';
import { mensaje } from '../models/chatrealTIme';
import { SupabaseService } from './supabaseService';


@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private supaBase = inject(SupabaseService)
  mensaje = signal<mensaje[]>([]);

  constructor() {
    this.cargarMesanejes();
    this.escucharMensajes();

  }


  async cargarMesanejes() {

    const { data, error } = await this.supaBase.getCliente()
      .from('chatGlobal')
      .select('*, usuarios(email)')
      .order('created_at', { ascending: true });

    if (error) throw error;

    if (data) this.mensaje.set(data as mensaje[]);


  }

  escucharMensajes() {
    this.supaBase.getCliente()
      .channel('chat_global')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chatGlobal'
        },
        async () => {
          this.cargarMesanejes();
        }
      )
      .subscribe();
  }

  async enviarMensaje(mensaje: string, userEmail: string) {

    const { error, data } = await this.supaBase.getCliente().from('usuarios').select('id').eq('email', userEmail);

    if (data && data.length > 0) {

      let id = data[0].id;

      const { error } = await this.supaBase.getCliente().from('chatGlobal').insert({ contenido: mensaje, id_usuario: id, email: userEmail });

    }

  }

}
