import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {   BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


//seervices
import { GameService } from './_services/game.service';
import { PersonService } from './_services/person.service';
import { GamePersonService } from './_services/gamePerson.service';


import { AppComponent } from './app.component';
import { PersonsComponent } from './persons/persons.component';
import { GamesComponent } from './games/games.component';
import { GamepersonComponent } from './gameperson/gameperson.component';
import { NavComponent } from './nav/nav.component';
import { TituloComponent } from './_shared/titulo/titulo.component';

import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { RegistrationComponent } from './user/registration/registration.component';

@NgModule({
  declarations: [				
    AppComponent,
      PersonsComponent,
      GamesComponent,
      GamepersonComponent,
      NavComponent,
      UserComponent,
      LoginComponent,
      RegistrationComponent,
      TituloComponent
      
   ],
  imports: [
    BrowserModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
       timeOut: 3000,
       preventDuplicates: true,
       progressBar: true
    }),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [GameService,PersonService,GamePersonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
