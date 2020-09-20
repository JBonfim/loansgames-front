import { Game } from './Game';
import { Person } from './Person';

export class GamePersonResponseView {
    id: number;
    person: Person;
    game: Game;
    isActive: boolean;
}
