import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReadingsComponent } from './components/readings/readings.component';
import { ExercisesComponent } from './components/exercises/exercises.component';
import { DeleteComponent } from './components/delete/delete.component';
import { ChatComponent } from './components/chat/chat.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RecoveryPasswordComponent } from './components/recovery-password/recovery-password.component';
import { RegisterSuccessfulComponent } from './components/register-successful/register-successful.component';
import { AcountDeleteComponent } from './components/acount-delete/acount-delete.component';
import { SendEmailComponent } from './components/send-email/send-email.component';
import { AuthGuard } from './auth.guard'; // Importa tu AuthGuard aquí

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'chat', component: ChatComponent, canActivate: [AuthGuard] },
  { path: 'readings', component: ReadingsComponent, canActivate: [AuthGuard] },
  { path: 'exercises', component: ExercisesComponent, canActivate: [AuthGuard] },
  { path: 'delete', component: DeleteComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'recovery-password', component: RecoveryPasswordComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register-successful', component: RegisterSuccessfulComponent },
  { path: 'acount-delete', component: AcountDeleteComponent, canActivate: [AuthGuard] },
  { path: 'send-email', component: SendEmailComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/chat' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

