import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';


declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [
    './login.component.css'
  ]
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor(
    public usuarioService: UsuarioService,
    public router: Router
  ) { }

  ngOnInit(): void {
    init_plugins();
    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      correo: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      condiciones: new FormControl(false)
    }, { validators: this.sonIguales('password', 'password2') });
  }

  sonIguales(campo1: string, campo2: string) {
    return (group: FormGroup) => {
      const pass1 = group.controls[campo1].value;
      const pass2 = group.controls[campo2].value;
      if (pass1 === pass2) {
        return null;
      }
      return {
        sonIguales: true
      };
    };
  }

  registrarUsuario() {
    if (!this.forma.valid) {
      return;
    }
    if (!this.forma.get('condiciones').value) {
      console.log('Debe de aceptar las condiciones');
      alert('Debe de aceptar las condiciones');
      return;
    }
    const usuario = new Usuario(
      this.forma.get('nombre').value,
      this.forma.get('correo').value,
      this.forma.get('password').value,
    );
    this.usuarioService.crearUsuario(usuario).subscribe(res => this.router.navigate(['/login']));
  }

}
