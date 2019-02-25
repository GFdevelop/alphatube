import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SimilarityService {

  constructor() { }

  private artist = new Subject();;
  private genre = new Subject();

  setArtist(artist:any){
    try {
      this.artist.next(artist);
    } catch {
      this.artist.next(undefined);
    }

  }

  setGenere(genre:any){
    try {
      this.genre.next(genre[0].name.value);
    } catch {
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
    this.setGenere(undefined);
    this.setArtist(undefined);
  }
}
