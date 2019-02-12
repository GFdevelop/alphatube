import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AtlasService {

  apiRef = 'http://www.site1826.tw.cs.unibo.it';

  constructor(private http: HttpClient) { }

  getId(id: string) {
    let params= {
      id: id
    };
    return this.http.get(this.apiRef + '/crazy', { params });
  }
}
