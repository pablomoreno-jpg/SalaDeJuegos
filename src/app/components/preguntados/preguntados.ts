import { Component, inject, OnInit } from '@angular/core';
import { PreguntadosService } from '../../services/preguntados-service';
import { CommonModule } from '@angular/common';
import { computed, signal } from '@angular/core';
import { GameService } from '../../services/usuarioService';
import { juegoInterfaceInsert } from '../../models/juegoModel';

@Component({
  selector: 'app-preguntados',
  imports: [CommonModule],
  templateUrl: './preguntados.html',
  styleUrl: './preguntados.css',
})

export class Preguntados implements OnInit {

  private quizSv = inject(PreguntadosService);
  private gameSv = inject(GameService);
  correctas: number = 0;
  respuestaElegida: string = '';
  correcto: boolean | null = null
  index = signal(0)
  preguntas = this.quizSv.preguntas;
  juegoTerminado = false;
  contestado = false;
  inicio: Date | null = null

  preguntaActual = computed(() => {
    return this.preguntas()[this.index()]
  });

  respuestaCorrecta = computed(() => {

    return this.preguntas()[this.index()]?.correct_answer;
  })

  respuestas = computed(() => {

    const pregunta = this.preguntaActual();

    if (!pregunta) return [];

    const opciones = [...pregunta.incorrect_answers,
    pregunta.correct_answer]

    return opciones.sort(() => Math.random() - 0.5)

  })


  ngOnInit(): void {

    this.iniciaQuiz()
  }

  private tomarTiempo(): number {

    if (!this.inicio) return 0;

    return Math.floor((new Date().getTime() - this.inicio.getTime()) / 1000);
  }

  iniciaQuiz() {

    this.index.set(0);
    this.quizSv.getQuiz();

    this.respuestaElegida = '';
    this.juegoTerminado = false;
    this.contestado = false;
    this.correctas = 0

    this.inicio = new Date();
  }

  contestar() {

    this.contestado = true;

    if (this.respuestaElegida === this.respuestaCorrecta()) {

      this.correctas++;
      this.correcto = true;
      return true;
    }
    else {
      this.correcto = false;
      return false;
    }


  }

  siguientePregunta() {

    this.respuestaElegida = '';
    this.correcto = null;
    if (this.index() < this.preguntas().length - 1) {
      this.contestado = false;
      this.index.update(valor => valor + 1);
    }
    else {
      this.juegoTerminado = true;
      this.guardarJuego();
    } 

  }

  async guardarJuego() {

    const tiempo = this.tomarTiempo();

    const juego: juegoInterfaceInsert = {
      juego: 'preguntados',
      tiempo: tiempo,
      aciertos: this.correctas,
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
