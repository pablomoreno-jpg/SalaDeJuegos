import { Component, inject, OnInit, signal } from '@angular/core';
import { GitUser } from '../../services/gitUser';
import { DatePipe } from '@angular/common';
import { Location } from '@angular/common';

@Component({
  selector: 'app-quien-soy',
  imports: [DatePipe],
  templateUrl: './quien-soy.html',
  styleUrl: './quien-soy.css',
})
export class QuienSoy implements OnInit {

  gitservice = inject(GitUser);
  soy = this.gitservice.user;

  constructor(private _location: Location){}


  ngOnInit(): void {
    this.gitservice.obtenerUsuario();
  }

}
