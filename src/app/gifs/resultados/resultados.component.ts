import { GifsService } from 'src/app/gifs/services/gifs.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent {

  get resultados(){
    return this.gifsService.resultados;
  }
  constructor( private gifsService: GifsService){
    
  }
}
