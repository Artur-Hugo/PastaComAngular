import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css']
})
export class UsuarioEditComponent implements OnInit {

  usuario: Usuario = new Usuario();
  idUsuario: number;
  tipoUsuario: string;
  confirmarSenha: string;

  constructor(
    private authService: AuthService,
    //isso serve para quando vai pegar um id que está na rota
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(){
    window.scroll(0,0)

    if(environment.token == ''){
      this.router.navigate(['/entrar']);
    }

    this.idUsuario = this.route.snapshot.params['id']
    this.findByIdUsuario(this.idUsuario)
  }

  confirmSenha(event: any){
    this.confirmarSenha = event.target.value
  }

  tipoUser(event: any){
    this.tipoUsuario = event.target.value
  }

  atualizar(){
    this.usuario.tipo = this.tipoUsuario

    if(this.usuario.senha != this.confirmarSenha){
      alert('As senhas não coincidem');
    } else {
      this.authService.putUsuario(this.usuario).subscribe((resp: Usuario)=>{
        this.usuario = resp;
        alert("Usuário atualizado com sucesso. Faça o login novamente")
        environment.token = "";
        environment.foto = "";
        environment.id = 0;
        environment.tipo = "";
        environment.nome = "";
        this.router.navigate(['/entrar']);
      });
    }

  }

  findByIdUsuario(id: number){
    this.authService.getByIdUsuario(id).subscribe((resp: Usuario)=> {
      this.usuario = resp
    })
  }

}
