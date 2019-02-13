import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AtlasService {

  apiRef = 'http://site1826.tw.cs.unibo.it';
  // ~ apiRef = 'http://gabriele.fulgaro.tw.cs.unibo.it';
  // ~ apiRef = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  getId(id: string) {
    const params= {
      user: id
    };
    // ~ return this.http.get(window.location.origin + '/crazy', { params });
    return this.http.get(this.apiRef + '/crazy', { params });
  }
}
