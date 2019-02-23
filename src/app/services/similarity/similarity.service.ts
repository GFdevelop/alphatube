import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SimilarityService {

  constructor() { }

  private artist = new Subject();
  private genre = new Subject();

  setArtist(artist:string){
    this.artist.next(artist);
  }

  setGenere(genre:any){
    try {
      this.genre.next(genre[0].name.value);
    } catch {
      console.log(genre); // TODO: remove console
      this.genre.next(undefined);
    }

  }

  getArtist(){
    return this.artist;
  }

  getGenere(){
    return this.genre;
  }

  emptyVar(){
    this.artist.next(undefined);
    this.genre.next(undefined);
  }
}
