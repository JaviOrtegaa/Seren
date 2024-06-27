import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ChatComponent } from './components/chat/chat.component';
import { RegisterComponent } from './components/register/register.component';
import { RecoveryPasswordComponent } from './components/recovery-password/recovery-password.component';
import { RegisterSuccessfulComponent } from './components/register-successful/register-successful.component';
import { ReadingsComponent } from './components/readings/readings.component';
import { ExercisesComponent } from './components/exercises/exercises.component';
import { DeleteComponent } from './components/delete/delete.component';
import { AcountDeleteComponent } from './components/acount-delete/acount-delete.component';
import { SendEmailComponent } from './components/send-email/send-email.component';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AuthService } from './auth.service';
import { ChatService } from './chat.service';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChatComponent,
    RegisterComponent,
    RecoveryPasswordComponent,
    RegisterSuccessfulComponent,
    ReadingsComponent,
    ExercisesComponent,
    DeleteComponent,
    AcountDeleteComponent,
    SendEmailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    MatCardModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    provideAnimationsAsync(),
    ChatService,
    provideFirebaseApp(() => initializeApp({"projectId":"sereni-7d469","appId":"1:368010060153:web:c84ee29f3028431b260fa8","storageBucket":"sereni-7d469.appspot.com","apiKey":"AIzaSyCeRBk2Gu9MhHNCeOoi63BwGtNR2ualHE8","authDomain":"sereni-7d469.firebaseapp.com","messagingSenderId":"368010060153"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

