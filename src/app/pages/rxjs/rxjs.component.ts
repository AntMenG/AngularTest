import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { retry, map, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {
    this.subscription = this.regresaObservable().pipe(
      retry(2)
    )
    .subscribe(
      numero => console.log('Subs', numero),
      error => console.error('Error en el obs', error),
      () => console.log('El observador terminó')
    );
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    console.log('Cerraste la página');
    this.subscription.unsubscribe();
  }

  regresaObservable(): Observable<number> {
    return new Observable(observer => {
      let contador = 0;
      const intervalo = setInterval(() => {
        contador++;
        const salida = {
          valor: contador
        };
        observer.next( salida );
        // if (contador === 10) {
        //   clearInterval(intervalo);
        //   observer.complete();
        // }
        // if (contador === 2) {
        //   observer.error('Auxilio');
        // }
      }, 1000);
    }).pipe(
      map((response: any) => response.valor),
      filter(response => response % 2 === 1)
    );
  }

}
