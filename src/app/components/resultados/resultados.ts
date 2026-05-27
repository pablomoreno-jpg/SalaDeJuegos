import { Component, inject, OnInit, signal } from '@angular/core';
import { EncuestaServices } from '../../services/usuarioService';
import { EncuestaSelect } from '../../models/encuestaModel';
import { DatePipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-resultados',
  imports: [DatePipe, RouterLink, RouterLinkActive],
  templateUrl: './resultados.html',
  styleUrl: './resultados.css',
})
export class Resultados implements OnInit {

  private encuestasSv = inject(EncuestaServices);
  listaDeEncuestas = signal<EncuestaSelect[]>([])

  async ngOnInit() {

    await this.trerEncuesta();

  }

  async trerEncuesta(){

    const encustas = await this.encuestasSv.traerEncuesta();

    this.listaDeEncuestas.set(encustas ?? [])

  }


}
