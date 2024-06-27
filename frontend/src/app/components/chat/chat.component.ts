import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../../chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  isMenuOpen = false;
  messages = [
    { from: 'ChatGPT', text: '¡Hola! ¿En qué puedo ayudarte? :3', timestamp: new Date() }
  ];
  userInput = '';

  constructor(private router: Router, private chatService: ChatService) {}

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    this.chatService.getMessages().subscribe(
      response => {
        this.messages = response.messages;
      },
      error => {
        console.error('Error al cargar mensajes:', error);
      }
    );
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  selectOption(option: string) {
    if (option === 'Chat') {
      this.router.navigate(['/chat']);
      this.isMenuOpen = true;
    } else if (option === 'Lecturas') {
      this.router.navigate(['/readings']);
      this.isMenuOpen = true;
    } else if (option === 'Ejercicios') {
      this.router.navigate(['/exercises']);
      this.isMenuOpen = true;
    }else if (option === 'Eliminar cuenta') {
      this.router.navigate(['/delete']);
      this.isMenuOpen = true;
    } else if (option === 'Cerrar sesión') {
      this.logout();
    }
  }

  logout() {
    this.router.navigate(['/login']);
  }

  sendMessage() {
    if (this.userInput.trim()) {
      const userMessage = {
        from: 'User',
        text: this.userInput,
        timestamp: new Date()
      };

      this.messages.push(userMessage);

      this.chatService.sendMessage(this.userInput).subscribe(
        response => {
          if (this.isEmotionalSupportResponse(response.reply)) {
            const botMessage = {
              from: 'ChatGPT',
              text: response.reply,
              timestamp: new Date()
            };
            this.messages.push(botMessage);
          } else {
            const botMessage = {
              from: 'ChatGPT',
              text: 'Recuerda, soy un asistente de ayuda emocional. ¿Hay algo más con lo que te pueda ayudar?',
              timestamp: new Date()
            };
            this.messages.push(botMessage);
          }
        },
        error => {
          console.error('Error enviando mensaje al backend:', error);
        }
      );

      this.userInput = '';
    }
  }

  private isEmotionalSupportResponse(message: string): boolean {
    const emotionalKeywords = ['hola', 'ánimo', 'triste', 'ansiedad', 'preocupado', 
      'deprimido', 'estres', 'consejo', 'ayuda', 'buenos dias', 'buenas noches', 'hablar'];
    const lowerCaseMessage = message.toLowerCase();

    for (const keyword of emotionalKeywords) {
      if (lowerCaseMessage.includes(keyword)) {
        return true;
      }
    }

    return false;
  }
}

