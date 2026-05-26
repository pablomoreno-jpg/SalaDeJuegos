import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoJuegos } from './listado-juegos';

describe('ListadoJuegos', () => {
  let component: ListadoJuegos;
  let fixture: ComponentFixture<ListadoJuegos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoJuegos],
    }).compileComponents();

    fixture = TestBed.createComponent(ListadoJuegos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
