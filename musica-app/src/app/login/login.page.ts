import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonInput,
  IonButton,
  IonIcon,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  musicalNotes,
  logInOutline,
  logoGoogle,
  logoApple,
  logoTiktok,
} from 'ionicons/icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [FormsModule, IonContent, IonInput, IonButton, IonIcon],
})
export class LoginPage {
  nombre = '';
  mensajeError = '';

  constructor(private router: Router) {
    addIcons({
      musicalNotes,
      logInOutline,
      logoGoogle,
      logoApple,
      logoTiktok,
    });
  }

  iniciarSesion() {
    const limpio = this.nombre.trim();
    if (!limpio) {
      this.mensajeError = 'Por favor, escribe tu nombre para entrar.';
      return;
    }

    this.mensajeError = '';
    localStorage.setItem('usuario_musica', limpio);
    this.router.navigate(['/home']);
  }

  entrarRapido(proveedor: string) {
    const nombreFinal = this.nombre.trim() || `Usuario ${proveedor}`;
    localStorage.setItem('usuario_musica', nombreFinal);
    this.router.navigate(['/home']);
  }
}