import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress') txtProgress: ElementRef;
  // tslint:disable-next-line: no-input-rename
  @Input('nombre') leyenda: string = 'Leyenda';
  @Input() percentage: number =  50;

  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onChanges(newValue: number): void {
    if (newValue > 100) {
      this.percentage = 100;
    } else if (newValue < 0) {
      this.percentage = 0;
    } else {
      this.percentage = newValue;
    }
    this.txtProgress.nativeElement.value = this.percentage;
    this.cambioValor.emit(this.percentage);
  }

  cambiarValor(value: number): void {
    if (this.percentage >= 100 && value === +5) {
      return;
    }
    if (this.percentage <= 0 && value === -5) {
      return;
    }
    this.percentage += value;
    this.cambioValor.emit( this.percentage );
    this.txtProgress.nativeElement.focus();
  }

}
