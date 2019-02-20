import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AtlasService {

  constructor(private http: HttpClient) { }

  getId(id: string) {
    return this.http.get(window.location.origin + '/crazy', {
      params: {
        user: id
      }
    });
  }
}
