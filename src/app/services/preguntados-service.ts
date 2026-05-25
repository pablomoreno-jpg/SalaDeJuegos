import { HttpClient } from '@angular/common/http';
import { NotExpr } from '@angular/compiler';
import { Injectable, inject, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PreguntadosService {

  private http = inject(HttpClient);
  private URL_quiz = 'https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple';
  private preguntasHttp = signal<any[]>([])

  preguntas = this.preguntasHttp.asReadonly();

  

  getQuiz() {
    this.http.get<any>(this.URL_quiz).subscribe({
      next:(data) => {
        this.preguntasHttp.set(data.results)

      },
      error: (error) => {
        console.log(error)
      }
    })
    
  }

}
