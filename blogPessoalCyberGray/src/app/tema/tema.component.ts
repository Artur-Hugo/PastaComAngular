import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';
import { Usuario } from '../model/Usuario';
import { TemaService} from '../service/tema.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  tema: Tema = new Tema()
  user: Usuario
  listaTema: Tema[]

  

  constructor(
    private router: Router,
    private temaService: TemaService
  ) { }

  ngOnInit() {
     //Assim que dar f5 a sessão vai expirar e com isso vai voltar para a tela de entrar
     if(environment.token == ''){
      alert('Sua seção expirou faça o login novamente.')
      this.router.navigate(['/entrar'])
      
    }

    if(environment.tipo != 'adm'  ){
      alert(`Você precisa ser adm ((${environment.tipo})) para acessar essa rota`)
      this.router.navigate(['/inicio'])
    }

      this.findAllTemas()
      this.temaService.refreshToken()
  }

  findAllTemas(){
    this.temaService.getAllTema().subscribe((resp: Tema[]) => {
      this.listaTema = resp 
  })
}

  cadastrar(){
    //
    this.temaService.postTema(this.tema).subscribe((resp: Tema)=>{
      this.tema = resp
      alert('Tema cadastrado com sucesso!')
      //zerar o campo:
      this.findAllTemas()
      this.tema = new Tema()
    })
  }

}
