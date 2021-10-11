import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  nome = environment.nome
  foto = environment.foto
  tipo = environment.tipo
  //Id: para saber qual usuario está logado, descobrir pelo o menu
  id = environment.id

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  sair(){
    this.router.navigate(['/entrar'])
    alert('Sua seção expirou, faça o login novamente.')
    environment.token = ''
    environment.nome = ''
    environment.tipo = ''
    environment.foto = ''
    environment.id = 0
  }
}
