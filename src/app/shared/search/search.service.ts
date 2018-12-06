import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  getAll(q: string) {
    return this.http.get('https://www.googleapis.com/youtube/v3/search' +
      '?part=snippet' +
      '&maxResults=12' +
      '&q=' + q +
      '&type=video' +
      '&videoCategoryId=10' +
      '&videoEmbeddable=true' +
      '&videoSyndicated=true' +
      '&key=AIzaSyCZIY9kX67U3u3wtgrO3FviBD_uIm5AQao'
    );
  }
}

//~ export class SearchResult {
  //~ videoId: string;
  //~ publishedAt: string;
  //~ title: string;
  //~ description: string;
  //~ thumbnail: string;
  //~ channelTitle: string;

  //~ constructor(obj?: any) {
    //~ this.videoId = obj.items.id.videoId;
    //~ this.publishedAt = obj.items.snippet.publishedAt;
    //~ this.title = obj.items.snippet.title;
    //~ this.description = obj.items.snippet.description;
    //~ this.thumbnail = obj.items.snippet.thumbnails.medium.url;
    //~ this.channelTitle = obj.items.snippet.channelTitle;
  //~ }
//~ }
