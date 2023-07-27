import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interface';
import { compileNgModule } from '@angular/compiler';

@Injectable({providedIn: 'root'})
export class GifsService {

  public gifList : Gif[]  = [];
  private _tagsHistory: string[] = [];
  private serviceUrl: string = 'https://jsonplaceholder.typicode.com'

  constructor( private http: HttpClient ) { }
  
  get tagsHistory() {
    return [...this._tagsHistory]
  }

  private organizeHistory(tag: string){
    tag = tag.toLowerCase();

    if (this._tagsHistory.includes(tag)) {  // si incluye el tag entonces lo elimina 
      this._tagsHistory = this._tagsHistory.filter( (oldTag => oldTag !== tag) ); // se queda solo con los distintos a tag
    }

    this._tagsHistory.unshift(tag); // agrega el eliminado
    this._tagsHistory = this._tagsHistory.splice(0, 10);   // muestra solo los 10 primeros

  }

  searchTag(tag : string): void {
    if (tag.length === 0) return;
    this.organizeHistory(tag)

    //this._tagsHistory.unshift(tag);  // agrega un elemento al array 

    /* this.http.get('https://jsonplaceholder.typicode.com/users')   // otro metodo 
      .subscribe( resp => {
        console.log(resp);
      }); */

    const params = new HttpParams()   // mejor metodo 
    //  .set('id', 5)
    //  .set('limit', '3')
      
    this.http.get<SearchResponse>(`${ this.serviceUrl }/users`, { params })
      .subscribe( resp => {

        this.gifList = resp.data;
        //console.log({gifs: this.gifList});
        console.log(resp);
        
      })
  }
}