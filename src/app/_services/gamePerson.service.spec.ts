/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GamePersonService } from './gamePerson.service';

describe('Service: GamePerson', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GamePersonService]
    });
  });

  it('should ...', inject([GamePersonService], (service: GamePersonService) => {
    expect(service).toBeTruthy();
  }));
});
