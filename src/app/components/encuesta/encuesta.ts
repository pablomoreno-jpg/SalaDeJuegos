import { Component, importProvidersFrom, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EncuestaServices } from '../../services/usuarioService';
import { EncuestaModel } from '../../models/encuestaModel';

@Component({
  selector: 'app-encuesta',
  imports: [FormsModule, CommonModule],
  templateUrl: './encuesta.html',
  styleUrl: './encuesta.css',
})
export class Encuesta {

  private encuestaSv = inject(EncuestaServices);
  error = signal('')
  loading = signal(false);

  nombre: string = '';
  apellido: string = '';
  edad: number = 0;
  telefono: string = '';
  opiniones: string = ''; //opinion 
  juegosFavoritos: string[] = []; // juegos que mas disfruto
  satisfaccion: string = ''; // nivel de satiffacion

  toggleJuego(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.checked) {


      this.juegosFavoritos.push(input.value)

    }
    else {

      this.juegosFavoritos = this.juegosFavoritos.filter(juego => juego != input.value);

    }
  }

  get juegosInvalidos(): boolean {

    return this.juegosFavoritos.length === 0;

  }

  juntarJuegos(){

    if(this.juegosFavoritos.length > 1){

      return this.juegosFavoritos.join(', ')

    }

    return this.juegosFavoritos[0];
  }


  async enviarRespuesta() {

    const miEncusta:EncuestaModel = {

      nombre:this.nombre,
      apellido: this.apellido,
      edad: this.edad,
      telefono: this.telefono,
      juegos: this.juntarJuegos(),
      opinion: this.opiniones,
      satifaccion: this.satisfaccion,

    }

    if(await this.encuestaSv.subirEncuesta(miEncusta)){

      console.log("la encuesta se subio exitosamente ")

    }
    else{

      console.log('no se pudo subir la encueta')

    }
  }


}
