import { Component, inject, OnInit } from '@angular/core';
import { carta } from '../../models/cartaModel';
import { CommonModule } from '@angular/common';
import { juegoIterface } from '../../models/juegoModel';
import { GameService } from '../../services/usuarioService';


@Component({
  selector: 'app-mayor-menor',
  imports: [CommonModule],
  templateUrl: './mayor-menor.html',
  styleUrl: './mayor-menor.css',
})
export class MayorMenor implements OnInit {

  private gameSv = inject(GameService);
  mazo: carta[] = [];
  cartaJugador?: carta;
  cartaIa?: carta;
  mostrarCarta = false;
  puntuacion = 400;
  rondaActual = 0;
  maxRondas = 3;
  juegoTerminado = false;
  resultado = '';

  ngOnInit(): void {
    this.iniciarJuego()

  }


  iniciarJuego() {
    this.juegoTerminado = false;
    this.puntuacion = 400;
    this.rondaActual = 0;
    this.resultado = '';
    this.crearMazo();
    this.mezclarMazo();
    this.nuevaRonda();
  }


  nuevaRonda() {

    this.mostrarCarta = false;

    this.resultado = '';

    this.cartaJugador = undefined;

    this.cartaIa = undefined;

    this.cartaJugador = this.sacarCarta();

    this.cartaIa = this.sacarCarta();

  }


  crearMazo() {

    this.mazo = [];

    for (let i = 2; i <= 10; i++) {

      this.mazo.push({ valor: i, imagen: 'assets/cartas/carta' + i + '.png' })
    }
  }

  mezclarMazo() {

    for (let i = this.mazo.length - 1; i > 0; i--) {

      const j = Math.floor(Math.random() * (i + 1));

      [this.mazo[i], this.mazo[j]] = [this.mazo[j], this.mazo[i]];

    }

  }

  sacarCarta(): carta | undefined {

    return this.mazo.pop();

  }


  elegir(opcion: 'mayor' | 'menor') {

    if (
      !this.cartaJugador ||
      !this.cartaIa ||
      this.juegoTerminado
    ) return;

    this.mostrarCarta = true;

    let acerto = false;

    if (opcion === 'mayor') {

      acerto =
        this.cartaIa.valor >
        this.cartaJugador.valor;

    } else {

      acerto =
        this.cartaIa.valor <
        this.cartaJugador.valor;

    }

    if (!acerto) {

      this.puntuacion -= 100;

    }

    this.resultado = acerto
      ? 'Correcto'
      : 'Incorrecto';


    if (this.rondaActual === this.maxRondas) {

      this.juegoTerminado = true;

      if (this.puntuacion > 0) {

        this.guardarPuntuacion()

      }

    }
    else {
      this.rondaActual++;
    }


  }

  async guardarPuntuacion() {
    const juego: juegoIterface = {
      juego: 'MayrMenor',
      puntuacion: this.puntuacion,
      tiempo: 0,
    }

    const succes = await this.gameSv.subirPuntuacionJuego(juego);

    if(succes){
      console.log('la puntuacion se guardo exitosamente');
    }
    else{
      console.log('Error al guarda la puntuacion');
    }
  }

}
