import { Usuario } from './../models/usuario.model';
import { UsuarioService } from './../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css'
  ]
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame = false;

  constructor(
    public usuarioService: UsuarioService,
    public router: Router
  ) { }

  ngOnInit(): void {
    init_plugins();
    this.email = localStorage.getItem('email') || '';
    this.recuerdame = this.email !== '' ? true : false;
  }

  ingresar(forma: NgForm) {
    if (forma.invalid) {
      return;
    }
    const usuario = new Usuario(
      null,
      forma.value.email,
      forma.value.password
    );
    this.usuarioService.login(usuario, forma.value.recuerdame).subscribe(() => this.router.navigate(['/dashboard']));
    console.log(forma.value);
  }

}
