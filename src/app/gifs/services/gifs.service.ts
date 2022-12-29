import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey:string = 'q8uvqKKKfqaMKA96GeHLKRx6ryr7I484';
  private servicioUrl :string = 'https://api.giphy.com/v1/gifs';
  
  // _ indica parametro privado (buenas practicas)
  private _historial:string[] = [];

 public resultados: Gif[] = [];

  get historial(){
    return [...this._historial];
  }

  constructor(private http: HttpClient){

    this._historial = JSON.parse(localStorage.getItem("historial")!) || []; //signo de exclamacion es para decir que 'confie en ti'
    this.resultados = JSON.parse(localStorage.getItem("resultados")!) || []; //signo de exclamacion es para decir que 'confie en ti'
    // o
    // if(localStorage.getItem("historial")){ //si la variable historial existe en el cache
    //   this._historial = JSON.parse(localStorage.getItem("historial")!); //guardo el historial en la variable del cache
    // }
  }

  buscarGifs(query: string){
    query = query.trim().toLocaleLowerCase();
    if(!this._historial.includes(query)){ //si no esta ya en el historial lo agrego
      this._historial.unshift(query); //incerto al inicio del array
      this._historial = this._historial.splice(0,10); //dejo los ultimios 10 insertados

      localStorage.setItem('historial', JSON.stringify(this._historial)); //guardo el historial en el cache del navegador
    }
    
    const params = new HttpParams() //defino parametros para mas orden
      .set('api_key',this.apiKey)
      .set('limit','10')
      .set('q',query);


    // console.log(this._historial);
    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, { params})
      .subscribe( (resp) => { // subscribe es parecido al .then, se ejecuta cuando se tenga la respuesta del get (resp es donde guardare el resultado)
        console.log(resp.data);
        this.resultados = resp.data;

        localStorage.setItem('resultados', JSON.stringify(resp.data)); //guardo las url en el cache del navegador
      });
  }
}
