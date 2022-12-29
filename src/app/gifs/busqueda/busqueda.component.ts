import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css'],
})
export class BusquedaComponent {
  // ViewChild sirve para buscar algun elemento en el html vinculado al componente
  // simbolo de exclamacion para indicar que el elemento existe (Non-null assertion operator)
  @ViewChild('txtBuscar') txtBuscar!: ElementRef;

  constructor(private gifsService: GifsService) {}
  buscar() {
    const valor = this.txtBuscar.nativeElement.value;
    if (valor.trim().length === 0) {
      //valido blancos
      return;
    }
    this.gifsService.buscarGifs(valor);
    this.txtBuscar.nativeElement.value = '';

    // console.log(this.txtBuscar)
  }
}
