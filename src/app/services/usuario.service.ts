import { URL_SERVICIOS } from './../config/config';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    public http: HttpClient
  ) {
    console.log('user service');
  }

  login(usuario: Usuario, recuerdame: boolean = false) {
    const url = `${URL_SERVICIOS}/login`;
    return this.http.post(url, usuario).pipe(
      map((res: any) => {
        localStorage.setItem('id', res.id);
        localStorage.setItem('token', res.token);
        localStorage.setItem('usuario', JSON.stringify(res.usuario));
        if (recuerdame) {
          localStorage.setItem('email', usuario.email);
        } else {
          localStorage.removeItem('email');
        }
        return true;
      })
    );
  }

  crearUsuario(usuario: Usuario) {
    const url = `${URL_SERVICIOS}/usuario`;
    return this.http.post(url, usuario).pipe(
        map((res: any) => {
          alert(`Usuario creado ${ usuario.email }`);
          return res.usuario;
        })
    );
  }

}
