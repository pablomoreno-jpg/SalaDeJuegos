import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Pregunta, PreguntadosModel } from '../models/preguntadosModel';

@Injectable({
  providedIn: 'root',
})
export class PreguntadosService {

  private http = inject(HttpClient);
  private URL_quiz = 'https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple';
  private preguntasHttp = signal<Pregunta[]>([])

  preguntas = this.preguntasHttp.asReadonly();

  getQuiz() {
    this.http.get<PreguntadosModel>(this.URL_quiz).subscribe({
      next:(data) => {
        this.preguntasHttp.set(data.results)

      },
      error: (error) => {
        console.log(error)
      }
    })
    
  }

}
