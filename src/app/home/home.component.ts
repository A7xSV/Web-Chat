import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ChatService } from '../services/chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userChats$;
  fillLink: boolean = false;
  isFilled = '';
  selectedLang;

  welcomeMessage: string;
  signoutMessage: string;
  joinMessage: string;
  createMessage: string;
  chatMessage: string;
  messageText: string;
  languageText:  string;
  welcome = {
    'en': 'Welcome to Babel Chat',
    'zh': '欢迎来到 Babel Chat',
    'es': 'Bienvenido a Babel Chat'
  };
  signout = {
    'en': 'Sign Out',
    'zh': '登出',
    'es': 'Desconectar'
  }
  joinB = {
    'en': 'Join Babel Chat',
    'zh': '加入 Babel Chat',
    'es': 'Únete a Babel Chat'
  }
  createB = {
    'en': 'Create New Chat',
    'zh': '创建新聊天',
    'es': 'Crear nuevo chat'
  }
  chatB = {
    'en': 'My Chats',
    'zh': '我的聊天',
    'es': 'Mis chats'
  }
  messageB = {
    'en': 'Messages',
    'zh': '消息',
    'es': 'Mensajes'
  }
  languageB = {
    'en': 'Language',
    'zh': '语言',
    'es': 'Idioma'
  }

  constructor(public auth: AuthService, public cs: ChatService, private router: Router) {}

  ngOnInit() {
    this.userChats$ = this.cs.getUserChats();
    this.selectedLang = 'en';
    this.welcomeMessage = this.welcome.en;
    this.signoutMessage = this.signout.en;
    this.joinMessage = this.joinB.en;
    this.createMessage = this.createB.en;
    this.chatMessage = this.chatB.en;
    this.messageText = this.messageB.en;
    this.languageText = this.languageB.en;
  }

  joinChat() {
    this.router.navigate(['/chats', this.isFilled.trim()], { queryParams: { lang: this.selectedLang }});
  }

  onLangChange(lang) {
    this.cs.selectedLang = lang;
    this.selectedLang = lang;
    this.welcomeMessage = this.welcome[lang];
    this.signoutMessage = this.signout[lang];
    this.joinMessage = this.joinB[lang];
    this.createMessage = this.createB[lang];
    this.chatMessage = this.chatB[lang];
    this.messageText = this.messageB[lang];
    this.languageText = this.languageB[lang];
  }

  enableFill() {
    this.fillLink = !this.fillLink;
  }
}
