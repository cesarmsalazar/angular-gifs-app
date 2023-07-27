import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
      <h5>Buscar:</h5>
      <input type="text"
      class="form-control"
      placeholder="Buscar gifs..."
      (keyup.enter)="searchTag()"
      #txtTagInput
      >
  `
})

export class SearchBoxComponent {

  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>

  constructor(private gifsService: GifsService) {}
  
  //searchTag(newTag: string){
  searchTag(){
    const newTag = this.tagInput.nativeElement.value;
    console.log({newTag});

    this.gifsService.searchTag(newTag);
    this.tagInput.nativeElement.value = '';
  }
}

/* @ViewChild y @ViewChildren: Enlaza el resultado
final de la vista del componente basado en el
predicado a la propiedad de la clase (no es válido para
directivas) */

