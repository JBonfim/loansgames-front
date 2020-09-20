import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Person } from '../_models/Person';
import { PersonService } from '../_services/person.service';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss']
})
export class PersonsComponent implements OnInit {

  titulo='Pessoas';

  personsFiltrados: Person[];
  persons: Person[];

  person: Person;
  modoSalvar = 'post';

  imagemLargura = 50;
  imagemMargem = 2;
  mostrarImagem = false;
  registerForm: FormGroup;
  bodyDeletarperson = '';

  file: File;
  fileNameToUpdate: string;
  dataAtual: string;

  // criado o get e set para não acessar a propriedade _filtroLista diretamente
  _filtroLista = '';

  constructor(
    private personService: PersonService,
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
      this.personsFiltrados = this.filtroLista ? this.filtrarPersons(this.filtroLista) : this.persons;
    }

     // o ngOnInit é executado antes da nossa interface ser implementada
     ngOnInit() {
      this.validation();
      this.getPersons();
    }

    editarPerson(Person: Person, template: any){
      this.modoSalvar = 'put';
      this.openModal(template);
      this.person = Object.assign({}, Person);
     
      this.registerForm.patchValue(this.person);
    }

    newPerson(template : any){
      this.modoSalvar = 'post';
      this.openModal(template);
    }

    excluirPerson(person: Person, template: any) {
      template.show();
      this.person = person;
      this.bodyDeletarperson = `Tem certeza que deseja excluir : ${person.name}, Código: ${person.id}`;
    }

    confirmeDelete(template: any) {
      this.personService.deletePerson(this.person.id).subscribe(
        () => {
            template.hide();
            this.getPersons();
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

   

    filtrarPersons(filtrarPor: string): any {
      filtrarPor = filtrarPor.toLocaleLowerCase();
      return this.persons.filter(
        person => person.name.toLocaleLowerCase().indexOf(filtrarPor) !== -1
        );
      }

     

      // configurando validadores
      validation() {
        this.registerForm = this.fb.group({
          name: ['', [ Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
          address: ['', Validators.required],
          phone: ['', Validators.required]
        });
      }

      onFileChange(event) {
        const reader = new FileReader();
        // verifico se existe uma imagem com o if abaixo
        if (event.target.files && event.target.files.length){
          this.file = event.target.files;
          console.log(this.file);
        }
      }

      


      salvarAlteracao(template: any) {
        // primeiro checo se o form está válido (todos os campos preenchidos corretos)
        if (this.registerForm.valid) {
          if (this.modoSalvar === 'post' ) {
            // na linha abaixo eu atribuo a minha variável Person a funcionalidade do javascript Object.assign
            // onde pego todos os objetos do formulário 'registerForm'
            this.person = Object.assign({}, this.registerForm.value);

            // agora chamo meu método 'postPerson' localizado em '../_services/Person.service' e passo o Person (this.Person)
            // que é meu formulário
            this.personService.postPerson(this.person).subscribe(
              (novoPerson: Person) => {
                console.log(novoPerson);
                template.hide();
                this.getPersons();
                this.toastr.success('Inserido com sucesso!');
              }, error => {
                this.toastr.error('Erro ao inserir: ${error}');
                console.log(error);
              }
              );
            } else {
              this.person = Object.assign({id: this.person.id}, this.registerForm.value);
            

              this.personService.putPerson(this.person).subscribe(
                () => {
                  template.hide();
                  this.getPersons();
                  this.toastr.success('Editado com sucesso!');
                }, error => {
                  this.toastr.error('Erro ao editar: ${error}');
                  console.log(error);
                }
              );
            }

          }// fim do if
        }// fim do método 'salvarAlteracao'

        getPersons() {
          // personService.getPerson() - ocaminho está direcionado em _services/personServices.ts
          // -> this.http.get('http://localhost:5000/api/values').subscribe
          this.personService.getAllPerson().subscribe(
            (_persons: Person[]) => {
              this.persons = _persons;
              this.personsFiltrados = this.persons;
              console.log(_persons);
            }, error => {
              this.toastr.error('Erro ao carregar Persons: ${error}');
              console.log(error);
            });
          }

}
