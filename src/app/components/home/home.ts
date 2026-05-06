import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  private router = inject(Router);

  constructor(private _Location: Location){}

  voler(){
    this._Location.back()
  }

  quienSoy(){
    this.router.navigate([`quienSoy`])
  }

}
