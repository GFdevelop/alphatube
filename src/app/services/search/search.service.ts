import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  apiRef = 'https://www.googleapis.com/youtube/v3';
  devKey = 'AIzaSyCZIY9kX67U3u3wtgrO3FviBD_uIm5AQao';

  constructor(private http: HttpClient) { }

  getSearch(q: string) {
    return this.http.get(this.apiRef + '/search',
      {
        params: {
          part: 'snippet',
          maxResults: '12',
          q: q,
          type: 'video',
          videoCategoryId: '10',
          videoEmbeddable: 'true',
          videoSyndicated: 'true',
          key: this.devKey
        }
      }
    );
  }

  getVideo(q: string) {
    return this.http.get(this.apiRef + '/videos',
      {
        params: {
          part: 'snippet',
          id: q,
          videoCategoryId: '10',
          key: this.devKey
        }
      }
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
