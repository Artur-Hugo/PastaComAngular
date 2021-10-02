import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'blogPessoalCyberGray';

  //Isso é para acessar o auth dentro do app.componente.html
  constructor(public auth: AuthService){}
}
