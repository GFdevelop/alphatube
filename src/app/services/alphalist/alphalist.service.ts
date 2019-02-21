import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AlphalistService {
  private head = 'http://site';
  private tail = '.tw.cs.unibo.it';

  constructor(private http: HttpClient) { }

  // ~ GET starting videos from the fvitali
  getAll() {
    return this.http.get(this.head + '1825' + this.tail + '/video.json');
  }

  getFV(videoID: string) {
    return this.http.get(this.head + '1825'+ this.tail + '/TW/globpop',{
        params: {
          id: videoID
        }
      }
    );
  }

  getGlobpop(siteID:string, videoID: string) {
    if (videoID != ''){
      return this.http.get(this.head + siteID + this.tail + '/globpop',{
        params: {
          id: videoID
        }
      });
    }
    else return this.http.get(this.head + siteID + this.tail + '/globpop');
  }

  getList() {
    return this.http.get(this.head + '1826' + this.tail + '/globpopList.json');
  }
}
