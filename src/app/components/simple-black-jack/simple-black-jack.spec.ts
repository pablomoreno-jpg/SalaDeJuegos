import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleBlackJack } from './simple-black-jack';

describe('SimpleBlackJack', () => {
  let component: SimpleBlackJack;
  let fixture: ComponentFixture<SimpleBlackJack>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimpleBlackJack],
    }).compileComponents();

    fixture = TestBed.createComponent(SimpleBlackJack);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
