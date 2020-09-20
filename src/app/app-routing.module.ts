import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamesComponent } from './games/games.component';
import { PersonsComponent } from './persons/persons.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GamepersonComponent } from './gameperson/gameperson.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { AuthGuard } from './auth/auth.guard';

/* configurando as rotas dos meus componentes */
const routes: Routes = [
  { path: 'user', component: UserComponent,
    children: [
      { path: 'login', component: LoginComponent},
      { path: 'registration', component: RegistrationComponent}
    ]
  },
  // canActivate: [AuthGuard] chama minha função para bloquear a rota que necessita de login
  { path: 'games', component: GamesComponent, canActivate: [AuthGuard] },
  { path: 'persons', component: PersonsComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'gamepersons', component: GamepersonComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full', canActivate: [AuthGuard]},
  // Caso seja digitado qualuqer coisa (**) direciono para o dashboard
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
