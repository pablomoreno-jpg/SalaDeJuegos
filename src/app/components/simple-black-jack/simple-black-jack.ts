import { Component, OnInit, inject } from '@angular/core';
import { carta } from '../../models/cartaModel';
import { GameService } from '../../services/usuarioService';
import { juegoInterfaceInsert } from '../../models/juegoModel';

@Component({
  selector: 'app-simple-black-jack',
  imports: [],
  templateUrl: './simple-black-jack.html',
  styleUrl: './simple-black-jack.css',
})
export class SimpleBlackJack implements OnInit {

  private gameSv = inject(GameService);
  juegoTerminado = false;
  partidaTerminda = false;
  revelarIa = false;
  revelarCarta = false;
  mostrarCartasIa = false;
  ganada = false;
  partidasGanadas = 0;
  contadorMano = 0;
  maxPartidas = 5;
  partidaAcutal = 0;

  mazo: carta[] = [];

  cartasJugador: carta[] = []
  cartasIa: carta[] = []

  ngOnInit(): void {

    this.jugarBlackJack();

  }


  jugarBlackJack() {
    this.partidasGanadas = 0;
    this.partidaAcutal = 1;
    this.juegoTerminado = false;

    this.iniciarRonda();

  }

  iniciarRonda() {

    this.ganada = false;

    this.partidaTerminda = false;

    this.revelarIa = false;

    this.revelarCarta = false;

    this.mostrarCartasIa = false;

    this.contadorMano = 0;

    this.mazo = this.crearMazo();

    this.mezclar(this.mazo);

    this.cartasJugador = this.cargarCartas();

    this.cartasIa = this.cargarCartas();

    this.contadorMano = this.valorDeMano(this.cartasJugador);

  }

  private valorDeMano(mano: Array<carta>): number {

    let total = mano.reduce((val, carta) => val + carta.valor, 0);

    let ases = mano.filter(carta => carta.valor === 11).length

    while (total > 21 && ases > 0) {

      total -= 10;
      ases--;
    }


    return total;
  }

  private cargarCartas(): Array<carta> {

    const cartas: Array<carta> = []

    for (var i = 0; i < 2; i++) {

      let carta = this.sacarCarta(this.mazo);

      if (carta) {
        cartas.push(carta)
      }


    }

    return cartas;

  }

  private sacarCarta(mazo: Array<carta>): carta | null {

    return mazo.length ? mazo.pop()! : null;

  }

  private mezclar(mazo: Array<carta>) {

    for (let i = mazo.length - 1; i > 0; i--) {

      const j = Math.floor(Math.random() * (i + 1));

      [mazo[i], mazo[j]] = [mazo[j], mazo[i]];

    }
  }

  private crearMazo(): Array<carta> {

    const mazo: Array<carta> = []
    const clase = ['K', 'J', 'Q'];
    let j = 0;

    for (let i = 2; i < 10; i++) {

      for (let j = 0; j < 4; j++) {

        mazo.push({ valor: i, imagen: './assets/cartas/carta' + i + '.png' })

      }

    }

    for (let i = 0; i < 12; i++) {

      mazo.push({ valor: 10, imagen: './assets/cartas/carta' + clase[j] + '.png' })

      j++;

      if (j > 2) {
        j = 0;
      }

    }

    for (let i = 0; i < 4; i++) {

      mazo.push({ valor: 11, imagen: './assets/cartas/carta' + 'A' + '.png' })

    }

    return mazo
  }

  private evaluarIa() {

    if (this.valorDeMano(this.cartasIa) < 17) {

      let carta = this.sacarCarta(this.mazo);

      if (carta) {

        this.cartasIa.push(carta);

      }

    }

  }

  pedirCarta() {

    let carta = this.sacarCarta(this.mazo);

    if (carta) {
      this.cartasJugador.push(carta)
      this.contadorMano = this.valorDeMano(this.cartasJugador);

      if (this.contadorMano > 21) {
        this.evaluarDuelo();
      }
    }


  }

  pasar() {
    this.evaluarIa()
    this.evaluarDuelo();
  }

  private reglas(manoJugador: number, manoIa: number) {

    let ganador = false;

    if (manoJugador > 21) {

      ganador = false;

    }
    else if (manoIa > 21) {
      ganador = true;

    }
    else if (manoIa > manoJugador) {

      ganador = false;


    }
    else if (manoJugador > manoIa) {
      ganador = true;
    }
    else {
      ganador = false;
    }

    if (ganador) {
      this.ganada = true;
      this.partidasGanadas++;
    }

  }


  private evaluarDuelo() {

    this.mostrarCartasIa = true;

    this.revelarIa = true;

    this.revelarCarta = true;

    this.partidaTerminda = true;

    const manoJugador = this.valorDeMano(this.cartasJugador);

    const manoIa = this.valorDeMano(this.cartasIa);

    this.reglas(manoJugador, manoIa);

  }

  siguientePartida() {

    if (this.partidaAcutal < this.maxPartidas) {
      this.partidaAcutal++;

      this.iniciarRonda();

    }
    else{

      this.juegoTerminado = true;
      
      this.guardarJuego();
    }
  }

  obtenerTotalDealer() {
    return this.valorDeMano(this.cartasIa);
  }

  private async guardarJuego() {
    const juego: juegoInterfaceInsert = {
      juego: 'simple blackjack',
      tiempo: 0,
      aciertos: this.partidasGanadas,
      letras: 0,
    }

    const succes = await this.gameSv.subirPuntuacionJuego(juego);

    if (succes) {

      console.log('Puntuacion guardada con exito');
    }
    else {
      console.log('Error al guardar la puntuacion');
    }

  }

}
