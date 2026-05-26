import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { juegoInterfaceInsert } from '../../models/juegoModel';
import { GameService } from '../../services/usuarioService';
import { ahorcadoInteface } from '../../models/ahorcadoNodel';


@Component({
  selector: 'app-ahorcado',
  imports: [CommonModule],
  templateUrl: './ahorcado.html',
  styleUrl: './ahorcado.css',
})
export class Ahorcado implements OnInit {

  private gameService = inject(GameService);
  palabraElegida?: ahorcadoInteface;
  letrasDePalabraElegida: string[] = [];
  letrasUsuadas: string[] = [];
  abecedario: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  letrasElegidas: number = 0;
  errores: number = 0;
  maxErrors: number = 6;
  puntuacion: number = 600;
  inicio: Date | null = null;
  juegoTerminado: boolean = false;
  ganador: boolean = false;
  tiempoTomado = false;

  palabras: ahorcadoInteface[] = [
    {tipo:"Animal", palabra:"PERRO"},
    {tipo:"Animal", palabra: "GATO"}, 
    {tipo:"Alemento natural", palabra: "FUEGO"}, 
    {tipo:"Teconologia", palabra: "RELOJ"}, 
    {tipo:"Arma", palabra:"ESCUDO"}, 
    {tipo:"Parte del Cuerpo", palabra:"CINTURA"}, 
    {tipo:"naturaleza", palabra:"PIEDRA"}
  ];

  ngOnInit(): void {

    this.iniciarJuego();

  }

  iniciarJuego() {

    this.palabraElegida = this.palabras[Math.floor(Math.random() * this.palabras.length)];
    this.letrasDePalabraElegida = Array(this.palabraElegida.palabra.length).fill('_');

    this.letrasUsuadas = [];

    this.errores = 0;

    this.juegoTerminado = false;
    this.ganador = false;
    this.puntuacion = 500;

    this.letrasUsuadas = [];
    this.tiempoTomado = false;
    this.inicio = null;

  }

  adivinarLetra(letra: string) {

    if (this.letrasUsuadas.includes(letra) || this.juegoTerminado) {
      return;
    }

    if (!this.tiempoTomado) {

      this.inicio = new Date();
      this.tiempoTomado = true;
    }


    this.letrasElegidas++;

    this.letrasUsuadas.push(letra);

    if (this.palabraElegida?.palabra.includes(letra)) {

      for (let i = 0; i < this.palabraElegida.palabra.length; i++) {

        if (this.palabraElegida.palabra[i] === letra) {

          this.letrasDePalabraElegida[i] = letra;
        }
      }

    } else {

      this.errores++;

      this.puntuacion -= 100;

      this.puntuacion = Math.max(0, this.puntuacion);
    }

    this.verificarVictoria();

    this.verificarDerrota();
  }

  verificarVictoria() {
    if (!this.letrasDePalabraElegida.includes('_')) {

      this.ganador = true;
      this.juegoTerminado = true;

      this.guardarPuntuacion();

    }
  }

  verificarDerrota() {

    if (this.errores === this.maxErrors) {

      this.juegoTerminado = true;

      this.guardarPuntuacion();

    }

  }

  tomarTiempo(): number {

    if (!this.inicio) return 0;

    return Math.floor((new Date().getTime() - this.inicio.getTime()) / 1000);
  }

  async guardarPuntuacion() {

    const tiempo = this.tomarTiempo();

    const juego: juegoInterfaceInsert = {
      juego: 'Ahorcado',
      letras: this.letrasElegidas,
      tiempo: tiempo,
      aciertos: 0,
    }

    const succes = await this.gameService.subirPuntuacionJuego(juego);

    if (succes) {

      console.log('Puntuacion guardada con exito');
    }
    else {
      console.log('Error al guardar la puntuacion');
    }


  }

}
