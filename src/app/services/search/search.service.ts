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
  
  getDescription(videoID: string) {
    return this.http.get(this.apiRef + '/videos', {
        params: {
          part: 'snippet,statistics',
		  id: videoID,
		  fields: 'items(snippet(description,tags),statistics(commentCount,dislikeCount,likeCount,viewCount))',
		  key: this.devKey
        }
      });
  }
  
  getComments(videoID: string) {
    return this.http.get(this.apiRef + '/commentThreads', {
        params: {
          part: 'snippet',
		  maxResults: '12',
		  order: 'relevance',
		  videoId: videoID,
		  fields: 'items(snippet(topLevelComment(snippet(authorDisplayName,authorProfileImageUrl,likeCount,textOriginal))))',
		  key: this.devKey
        }
      });
  }
}
