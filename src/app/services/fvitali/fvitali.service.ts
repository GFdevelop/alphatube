import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class FvitaliService {

  private URL = 'http://site1825.tw.cs.unibo.it/video.json';

  constructor(private http: HttpClient) { }

  // ~ GET starting videos from the fvitali
  getAll() {
    return this.http.get(this.URL);
  }
}
