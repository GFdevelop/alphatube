import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class YoutubeService {

  apiRef = 'https://www.googleapis.com/youtube/v3';
  devKey = 'AIzaSyCZIY9kX67U3u3wtgrO3FviBD_uIm5AQao';   // TODO: the key must be retrived from the server!!!

  constructor(private http: HttpClient) { }

  getSearch(name: string, value: string) {
    return this.http.get(this.apiRef + '/search',
      {
        params: {
          part: 'snippet',
          maxResults: '12',
          [name]: value, // developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names
          type: 'video',
          videoCategoryId: '10',
          videoEmbeddable: 'true',
          videoSyndicated: 'true',
          fields: 'etag,items(etag,id/videoId,snippet(channelTitle,publishedAt,thumbnails/medium/url,title)),' +
                  'nextPageToken,pageInfo/totalResults,prevPageToken',
          key: this.devKey
        }
      }
    );
  }

  getVideo(videoId: string) {
    return this.http.get(this.apiRef + '/videos',
      {
        params: {
          part: 'snippet,player,statistics',
          id: videoId,
          fields: 'etag,items(etag,id,player,snippet(categoryId,description,publishedAt,tags,title),' +
                  'statistics(dislikeCount,likeCount,viewCount)),visitorId',
          key: this.devKey
        }
      }
    );
  }

  getComments(videoId: string) {
    return this.http.get(this.apiRef + '/commentThreads',
      {
        params: {
          part: 'snippet',
          maxResults: '12',
          order: 'relevance',
          videoId: videoId,
          fields: 'items(snippet(topLevelComment(snippet(authorDisplayName,authorProfileImageUrl,likeCount,textOriginal))))',
          key: this.devKey
        }
      }
    );
  }
}
