import { SettingsService } from './../../services/settings.service';
import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(
    public ajustes: SettingsService
  ) { }

  ngOnInit(): void {
    this.colocarCheck();
  }

  changeColor(tema: string, link: any): void {
    this.applyCheck(link);
    this.ajustes.aplicarTema(tema);
  }

  applyCheck(link: any): void {
    const selectors: any = document.getElementsByClassName('selector');
    for (const ref of selectors) {
      ref.classList.remove('working');
    }
    link.classList.add('working');
  }

  colocarCheck(): void {
    const selectors: any = document.getElementsByClassName('selector');
    const tema = this.ajustes.ajustes.tema;
    for (const ref of selectors) {
      if (ref.getAttribute('data-theme') === tema) {
        ref.classList.add('working');
        break;
      }
    }
  }

}
