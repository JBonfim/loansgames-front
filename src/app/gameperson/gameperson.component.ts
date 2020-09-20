import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Game } from '../_models/Game';
import { GamePerson } from '../_models/GamePerson';
import { GamePersonResponseView } from '../_models/GamePersonResponseView';
import { Person } from '../_models/Person';
import { GameService } from '../_services/game.service';
import { GamePersonService } from '../_services/gamePerson.service';
import { PersonService } from '../_services/person.service';

@Component({
  selector: 'app-gameperson',
  templateUrl: './gameperson.component.html',
  styleUrls: ['./gameperson.component.scss']
})
export class GamepersonComponent implements OnInit {

  
  titulo='Emprestimo de Jogos';

  gamesFiltrados: GamePersonResponseView[];
  gamerFiltrados: Game[];
  personsFiltrados: Person[];
  
  games: GamePersonResponseView[];
  gamer: Game[];

  game: GamePersonResponseView;
  editGame :  GamePerson;
  modoSalvar = 'post';

  imagemLargura = 50;
  imagemMargem = 2;
  mostrarImagem = false;
  registerForm: FormGroup;
  bodyDeletargame = '';

  file: File;
  fileNameToUpdate: string;
  dataAtual: string;
  isEdit =  true;

  // criado o get e set para não acessar a propriedade _filtroLista diretamente
  _filtroLista = '';

  constructor(
    private GameService: GameService,
    private GamePersonService: GamePersonService,
    private PersonService: PersonService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private  localeService: BsLocaleService,
    private toastr: ToastrService
    ) {
      this.localeService.use('pt-br');
    }

    get filtroLista(): string {
      return this._filtroLista;
    }

    set filtroLista(value: string) {
      this._filtroLista = value;
      this.gamesFiltrados = this.filtroLista ? this.filtrarGames(this.filtroLista) : this.games;
    }

     // o ngOnInit é executado antes da nossa interface ser implementada
     ngOnInit() {
      this.validation();
      this.getGameLoans();
    }

    editarGame(Game: GamePersonResponseView, template: any){
      this.modoSalvar = 'put';
      this.isEdit = true;
      this.openModal(template);
      let editGame = new GamePerson();
      editGame.id = Game.id;
      editGame.idGame = Game.game.id;
      editGame.idPerson = Game.person.id;
      editGame.isActive = Game.isActive;
      this.editGame = Object.assign({}, editGame);
      
    
     
      this.registerForm.patchValue(this.editGame);
     // this.registerForm.get('').value = true
      this.getGames()
      this.getPersons()

    }

    newGame(template : any){
      this.modoSalvar = 'post';
      this.isEdit = false;
      this.openModal(template);
      let editGame = new GamePerson();
      editGame.id = 0;
      editGame.idGame = 0;
      editGame.idPerson = 0;
      editGame.isActive = true;
      this.editGame = Object.assign({}, editGame);
      
    
     
      this.registerForm.patchValue(this.editGame);
     // this.registerForm.get('').value = true
      this.getGames()
      this.getPersons()
    }

    excluirGame(game: GamePersonResponseView, template: any) {
      template.show();
      this.game = game;
      this.bodyDeletargame = `Tem certeza que deseja excluir registro Código: ${game.id}`;
    }

    confirmeDelete(template: any) {
      this.GamePersonService.deleteGamePerson(this.game.id).subscribe(
        () => {
            template.hide();
            this.getGameLoans();
            this.toastr.success('Deletado com sucesso');
          }, error => {
            this.toastr.error('Erro ao tentar deletar');
            console.log(error);
          }
      );
    }

    openModal(template: any) {
      this.registerForm.reset();
      template.show();
    }

   

    filtrarGames(filtrarPor: string): any {
      filtrarPor = filtrarPor.toLocaleLowerCase();
      return this.games.filter(
        game => game.person.name.toLocaleLowerCase().indexOf(filtrarPor) !== -1
        );
      }

     

      // configurando validadores
      validation() {
        this.registerForm = this.fb.group({
          idPerson  : ['', [ Validators.required]],
          idGame: ['', [ Validators.required]],
          isActive: ['', [ Validators.required]]
        });
      }
      


      salvarAlteracao(template: any) {
        // primeiro checo se o form está válido (todos os campos preenchidos corretos)
        if (this.registerForm.valid) {
          if (this.modoSalvar === 'post' ) {
            // na linha abaixo eu atribuo a minha variável Game a funcionalidade do javascript Object.assign
            // onde pego todos os objetos do formulário 'registerForm'
            this.editGame = Object.assign({}, this.registerForm.value);

            // agora chamo meu método 'postGame' localizado em '../_services/Game.service' e passo o Game (this.game)
            // que é meu formulário
            this.GamePersonService.postGamePerson(this.editGame).subscribe(
              (novoGame: Game) => {
                console.log(novoGame);
                template.hide();
                this.getGameLoans();
                this.toastr.success('Inserido com sucesso!');
              }, error => {
                this.toastr.error('Erro ao inserir: ${error}');
                console.log(error);
              }
              );
            } else {
              this.editGame = Object.assign({id: this.editGame.id}, this.registerForm.value);
            

              this.GamePersonService.putGamePerson(this.editGame).subscribe(
                () => {
                  template.hide();
                  this.getGameLoans();
                  this.toastr.success('Editado com sucesso!');
                }, error => {
                  this.toastr.error('Erro ao editar: ${error}');
                  console.log(error);
                }
              );
            }

          }// fim do if
        }// fim do método 'salvarAlteracao'

        getGameLoans() {
          this.GamePersonService.getAllGame().subscribe(
            (_Games: GamePersonResponseView[]) => {
              this.games = _Games;
              this.gamesFiltrados = this.games;
              console.log(_Games);
            }, error => {
              this.toastr.error('Erro ao carregar Games: ${error}');
              console.log(error);
            });
          }


          getGames() {
            this.GameService.getAllGame().subscribe(
              (_games: Game[]) => {
                this.gamer = _games;
                this.gamerFiltrados = this.gamer;
              }, error => {
                this.toastr.error('Erro ao carregar Games: ${error}');
                console.log(error);
              });
            }

            getPersons() {
              this.PersonService.getAllPerson().subscribe(
                (_persons: Person[]) => {
                  this.personsFiltrados = _persons;
                }, error => {
                  this.toastr.error('Erro ao carregar Persons: ${error}');
                  console.log(error);
                });
              }

}

