import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { GamePerson } from '../_models/GamePerson';
import { GamePersonResponseView } from '../_models/GamePersonResponseView';
import { GamePersonService } from '../_services/gamePerson.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  
  
  titulo='Jogos Emprestados';

  gamesFiltrados: GamePersonResponseView[];

  
  games: GamePersonResponseView[];
 

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
    private GamePersonService: GamePersonService,
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

     
     ngOnInit() {
      this.getGameLoans();
    }

   
   

    filtrarGames(filtrarPor: string): any {
      filtrarPor = filtrarPor.toLocaleLowerCase();
      return this.games.filter(
        game => game.person.name.toLocaleLowerCase().indexOf(filtrarPor) !== -1
        );
      }


        getGameLoans() {
          this.GamePersonService.getSelectAllAsyncIsStatusIsActive().subscribe(
            (_Games: GamePersonResponseView[]) => {
              this.games = _Games;
              this.gamesFiltrados = this.games;
              console.log(_Games);
            }, error => {
              this.toastr.error('Erro ao carregar Games: ${error}');
              console.log(error);
            });
          }


         

}
