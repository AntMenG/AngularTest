import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {
    this.contarTres()
    .then((res) => console.log('terminó', res))
    .catch((error) => console.error('error en promesa', error));
  }

  ngOnInit(): void {
  }

  contarTres(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let contador = 0;
      const interval = setInterval(() => {
        contador++;
        if (contador === 3) {
          resolve(true);
          clearInterval(interval);
        }
      }, 1000);
    });
  }

}
