import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Game } from '../_models/Game';
import { GameService } from '../_services/game.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  titulo='Jogos';

  gamesFiltrados: Game[];
  games: Game[];

  game: Game;
  modoSalvar = 'post';

  imagemLargura = 50;
  imagemMargem = 2;
  mostrarImagem = false;
  registerForm: FormGroup;
  bodyDeletargame = '';

  file: File;
  fileNameToUpdate: string;
  dataAtual: string;

  // criado o get e set para não acessar a propriedade _filtroLista diretamente
  _filtroLista = '';

  constructor(
    private GameService: GameService,
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
      this.getGames();
    }

    editarGame(Game: Game, template: any){
      this.modoSalvar = 'put';
      this.openModal(template);
      this.game = Object.assign({}, Game);
     
      this.registerForm.patchValue(this.game);
    }

    newGame(template : any){
      this.modoSalvar = 'post';
      this.openModal(template);
    }

    excluirGame(game: Game, template: any) {
      template.show();
      this.game = game;
      this.bodyDeletargame = `Tem certeza que deseja excluir : ${game.descryption}, Código: ${game.id}`;
    }

    confirmeDelete(template: any) {
      this.GameService.deleteGame(this.game.id).subscribe(
        () => {
            template.hide();
            this.getGames();
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
        game => game.descryption.toLocaleLowerCase().indexOf(filtrarPor) !== -1
        );
      }

     

      // configurando validadores
      validation() {
        this.registerForm = this.fb.group({
          descryption: ['', [ Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
          details: ['']
        });
      }
      


      salvarAlteracao(template: any) {
        // primeiro checo se o form está válido (todos os campos preenchidos corretos)
        if (this.registerForm.valid) {
          if (this.modoSalvar === 'post' ) {
            // na linha abaixo eu atribuo a minha variável Game a funcionalidade do javascript Object.assign
            // onde pego todos os objetos do formulário 'registerForm'
            this.game = Object.assign({}, this.registerForm.value);

            // agora chamo meu método 'postGame' localizado em '../_services/Game.service' e passo o Game (this.game)
            // que é meu formulário
            this.GameService.postGame(this.game).subscribe(
              (novoGame: Game) => {
                console.log(novoGame);
                template.hide();
                this.getGames();
                this.toastr.success('Inserido com sucesso!');
              }, error => {
                this.toastr.error('Erro ao inserir: ${error}');
                console.log(error);
              }
              );
            } else {
              this.game = Object.assign({id: this.game.id}, this.registerForm.value);
            

              this.GameService.putGame(this.game).subscribe(
                () => {
                  template.hide();
                  this.getGames();
                  this.toastr.success('Editado com sucesso!');
                }, error => {
                  this.toastr.error('Erro ao editar: ${error}');
                  console.log(error);
                }
              );
            }

          }// fim do if
        }// fim do método 'salvarAlteracao'

        getGames() {
          this.GameService.getAllGame().subscribe(
            (_Games: Game[]) => {
              this.games = _Games;
              this.gamesFiltrados = this.games;
              console.log(_Games);
            }, error => {
              this.toastr.error('Erro ao carregar Games: ${error}');
              console.log(error);
            });
          }

}




