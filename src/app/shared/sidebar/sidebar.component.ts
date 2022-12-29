import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  get historial(){
    return this.gifsSerfice.historial;
  }
  constructor (private gifsSerfice: GifsService){}

  buscar_sidebar(argumento:string){
    console.log(argumento);
    this.gifsSerfice.buscarGifs(argumento);
  }
}
