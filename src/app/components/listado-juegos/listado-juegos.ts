import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { GameService } from '../../services/usuarioService';
import { juegoInterfaceSelect } from '../../models/juegoModel';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-listado-juegos',
  imports: [DatePipe],
  templateUrl: './listado-juegos.html',
  styleUrl: './listado-juegos.css',
})
export class ListadoJuegos implements OnInit {

  private gameService = inject(GameService);
  listadoPuntuaciones = signal<juegoInterfaceSelect[]>([]);
  listaAhorcado = computed(() =>
    this.listadoPuntuaciones()
      .filter(p => p.juego === 'Ahorcado').sort((a, b) => {
        if ((a.letras ?? 0) !== (b.letras ?? 0)) {
          return (a.letras ?? 0) - (b.letras ?? 0);
        }

        return (b.tiempo ?? 0) - (a.tiempo ?? 0);
      })
      .map(p => ({
        jugador: p.usuarios?.email,
        tiempo: p.tiempo,
        letras: p.letras,
        fecha: p.created_at
      }))
  );

  listaMayorMenor = computed(() =>
    this.listadoPuntuaciones()
      .filter(p => p.juego === 'MayorMenor').sort((a, b) => (b.aciertos ?? 0) - (a.aciertos ?? 0))
      .slice(0, 5)
      .map(p => ({
        jugador: p.usuarios?.email,
        aciertos: p.aciertos,
        fecha: p.created_at
      }))
  );

  listaPreguntados = computed(() =>
    this.listadoPuntuaciones()
      .filter(p => p.juego === 'preguntados').sort((a, b) => {
        if ((b.aciertos ?? 0) !== (a.aciertos ?? 0)) {
          return (b.aciertos ?? 0) - (a.aciertos ?? 0);
        }

        return (a.tiempo ?? 0) - (b.tiempo ?? 0);
      })
      .slice(0, 5)
      .map(p => ({
        jugador: p.usuarios?.email,
        tiempo: p.tiempo,
        aciertos: p.aciertos,
        fecha: p.created_at
      }))
  );

  listaBlackJack = computed(() =>
    this.listadoPuntuaciones()
      .filter(p => p.juego === 'simple blackjack').sort((a, b) => (b.aciertos ?? 0) - (a.aciertos ?? 0))
      .slice(0, 5)
      .map(p => ({
        jugador: p.usuarios?.email,
        aciertos: p.aciertos,
        fecha: p.created_at
      }))
  );

  async ngOnInit() {

    console.log('listado juegos init');

    await this.traerPuntuaciones()

  }

  async traerPuntuaciones() {

    const puntuaciones = await this.gameService.traerPuntuacionesJuego();

    this.listadoPuntuaciones.set(puntuaciones ?? []);

    console.log('puntuaciones', this.listaAhorcado);


  }





}
