import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  chat$: Observable<any>;
  newMsg: string;
  selectedLang: string;
  messages;
  languages = ['en', 'zh', 'es'];

  constructor(
    public cs: ChatService,
    private route: ActivatedRoute,
    public auth: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    const chatId = this.route.snapshot.paramMap.get('id');
    const source = this.cs.get(chatId);
    this.chat$ = this.cs.joinUsers(source); // .pipe(tap(v => this.scrollBottom(v)));
    this.scrollBottom();

    this.selectedLang = this.route.snapshot.queryParams['lang'];
    this.chat$.subscribe(res => {
      res.messages.forEach(el => {
        var words = el.content.split('<<>>');
        var idx = this.languages.indexOf(this.selectedLang);
        // el.content = words[idx];
        el.toDisplay = words[idx];
      });
    });
  }

  submit(chatId) {
    if (!this.newMsg) {
      return alert('you need to enter something');
    }
    this.http.post('https://webapp-190209182616.azurewebsites.net/api/translate?text=' + this.newMsg  + '&sourcelanguage=' + this.selectedLang, this.newMsg, {responseType: 'text'}).subscribe(res => {
      res = JSON.parse(res);
      // this.newMsg = this.newMsg + '<<>>Test<<>>' + res;
      this.newMsg = res['en'] + '<<>>' + res['zh'] + '<<>>' + res['es'];
      this.cs.sendMessage(chatId, this.newMsg);
      this.newMsg = '';
      this.scrollBottom();
    });
    // this.cs.sendMessage(chatId, this.newMsg);
    // this.newMsg = '';
    // this.scrollBottom();
  }

  trackByCreated(i, msg) {
    return msg.createdAt;
  }

  private scrollBottom() {
    setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 500);
  }
}
