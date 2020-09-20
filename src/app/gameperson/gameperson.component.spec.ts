/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GamepersonComponent } from './gameperson.component';

describe('GamepersonComponent', () => {
  let component: GamepersonComponent;
  let fixture: ComponentFixture<GamepersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamepersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamepersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
