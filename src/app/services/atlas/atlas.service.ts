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

  update(user: any, newId: string, reason: string, oldId: string) {
    return this.http.put(window.location.origin + '/update', {
      params: {
        user: user,
        newId: newId,
        reason: reason,
        oldId: oldId
      }
    });
  }
}
