import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AlphalistService {

  private URL = 'http://site1825.tw.cs.unibo.it';

  constructor(private http: HttpClient) { }

  // ~ GET starting videos from the fvitali
  getAll() {
    return this.http.get(this.URL + '/video.json');
  }

  getGlobpop(videoId: string) {
    return this.http.get(this.URL + '/TW/globpop?id=' + videoId);
  }
}
