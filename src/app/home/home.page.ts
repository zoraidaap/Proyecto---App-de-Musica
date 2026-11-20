import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonSearchbar,
  IonButton,
  IonIcon,
  IonChip,
  IonLabel,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  play,
  pause,
  playSkipForward,
  heart,
  heartOutline,
  musicalNotes,
  headset,
  flame,
  disc,
  radio,
  notificationsOutline,
  personCircle,
  logOutOutline,
  sparkles,
  sunny,
} from 'ionicons/icons';

interface Cancion {
  id: number;
  titulo: string;
  artista: string;
  genero: string;
  duracion: string;
  gradiente: string;
  icono: string;
  favorito: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    FormsModule,
    IonContent,
    IonSearchbar,
    IonButton,
    IonIcon,
    IonChip,
    IonLabel,
  ],
})
export class HomePage implements OnInit {
  nombreUsuario = 'Invitado';
  textoBusqueda = '';
  generoSeleccionado = 'Todos';
  generos = ['Todos', 'Cristiano Católico', 'Rock', 'Pop', 'Alternativo'];

  cancionActual: Cancion | null = null;
  estaReproduciendo = false;

  recomendados: Cancion[] = [
    {
      id: 1,
      titulo: 'Vida de rico',
      artista: 'Camilo',
      genero: 'Pop',
      duracion: '3:05',
      gradiente: 'linear-gradient(135deg, #ff512f, #f09819)',
      icono: 'flame',
      favorito: false,
    },
    {
      id: 2,
      titulo: 'Blinding Lights',
      artista: 'The Weeknd',
      genero: 'Pop',
      duracion: '3:20',
      gradiente: 'linear-gradient(135deg, #312e81, #6366f1)',
      icono: 'sparkles',
      favorito: false,
    },
    {
      id: 3,
      titulo: 'Bohemian Rhapsody',
      artista: 'Queen',
      genero: 'Rock',
      duracion: '5:55',
      gradiente: 'linear-gradient(135deg, #0f172a, #0d9488)',
      icono: 'disc',
      favorito: true,
    },
    {
      id: 4,
      titulo: 'Cristo Reina',
      artista: 'Athenas',
      genero: 'Cristiano Católico',
      duracion: '4:08',
      gradiente: 'linear-gradient(135deg, #f7971e, #ffd200)',
      icono: 'sunny',
      favorito: true,
    },
  ];

  recientes: Cancion[] = [
    {
      id: 5,
      titulo: 'In the end',
      artista: 'Linkin Park',
      genero: 'Rock',
      duracion: '3:36',
      gradiente: 'linear-gradient(135deg, #cb2d3e, #ef473a)',
      icono: 'headset',
      favorito: true,
    },
    {
      id: 6,
      titulo: 'Contigo María',
      artista: 'Athenas',
      genero: 'Cristiano Católico',
      duracion: '3:52',
      gradiente: 'linear-gradient(135deg, #36d1dc, #5b86e5)',
      icono: 'sunny',
      favorito: true,
    },
    {
      id: 7,
      titulo: 'Te Alabo',
      artista: 'Itala & Juanjo',
      genero: 'Cristiano Católico',
      duracion: '4:15',
      gradiente: 'linear-gradient(135deg, #1e3a8a, #3b82f6)',
      icono: 'musical-notes',
      favorito: true,
    },
    {
      id: 8,
      titulo: 'Clint Eastwood',
      artista: 'Gorillaz',
      genero: 'Alternativo',
      duracion: '5:40',
      gradiente: 'linear-gradient(135deg, #62f367, #22c027)',
      icono: 'radio',
      favorito: false,
    },
    {
      id: 9,
      titulo: 'Creep',
      artista: 'Radiohead',
      genero: 'Rock',
      duracion: '3:58',
      gradiente: 'linear-gradient(135deg, #dc4890, #b80f85)',
      icono: 'disc',
      favorito: false,
    },
    {
      id: 10,
      titulo: 'Inner Vision',
      artista: 'Reichi Nakaido',
      genero: 'Alternativo',
      duracion: '4:12',
      gradiente: 'linear-gradient(135deg, #0072ff, #00c6ff)',
      icono: 'sparkles',
      favorito: false,
    },
  ];

  constructor(private router: Router) {
    addIcons({
      play,
      pause,
      playSkipForward,
      heart,
      heartOutline,
      musicalNotes,
      headset,
      flame,
      disc,
      radio,
      notificationsOutline,
      personCircle,
      logOutOutline,
      sparkles,
      sunny,
    });
  }

  ngOnInit() {
    this.cargarUsuario();
  }

  ionViewWillEnter() {
    this.cargarUsuario();
  }

  cargarUsuario() {
    this.nombreUsuario = localStorage.getItem('usuario_musica') || 'Invitado';
  }

  cerrarSesion() {
    localStorage.removeItem('usuario_musica');
    this.router.navigate(['/login']);
  }

  get recientesFiltrados(): Cancion[] {
    const filtro = this.textoBusqueda.trim().toLowerCase();
    return this.recientes.filter((c) => {
      const coincideGenero =
        this.generoSeleccionado === 'Todos' || c.genero === this.generoSeleccionado;
      const coincideTexto =
        !filtro ||
        c.titulo.toLowerCase().includes(filtro) ||
        c.artista.toLowerCase().includes(filtro);
      return coincideGenero && coincideTexto;
    });
  }

  seleccionarGenero(genero: string) {
    this.generoSeleccionado = genero;
  }

  reproducir(cancion: Cancion) {
    if (this.cancionActual?.id === cancion.id) {
      this.estaReproduciendo = !this.estaReproduciendo;
    } else {
      this.cancionActual = cancion;
      this.estaReproduciendo = true;
    }
  }

  toggleFavorito(cancion: Cancion, event: Event) {
    event.stopPropagation();
    cancion.favorito = !cancion.favorito;
  }

  siguienteCancion() {
    if (!this.cancionActual) return;
    const todas = [...this.recomendados, ...this.recientes];
    const index = todas.findIndex((c) => c.id === this.cancionActual?.id);
    this.cancionActual = todas[(index + 1) % todas.length];
    this.estaReproduciendo = true;
  }
}