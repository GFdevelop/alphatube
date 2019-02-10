import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class YoutubeService {

  apiRef = 'https://www.googleapis.com/youtube/v3';
  devKey = 'AIzaSyCZIY9kX67U3u3wtgrO3FviBD_uIm5AQao';   // TODO: the key must be retrived from the server!!!

  constructor(private http: HttpClient) { }

  getSearch(q: string, pageToken?: string) {
    const params = {
      part: 'snippet',
      maxResults: '12',
      q: q,
      type: 'video',
      videoCategoryId: '10',
      videoEmbeddable: 'true',
      videoSyndicated: 'true',
      fields: 'etag,items(etag,id/videoId,snippet(channelTitle,publishedAt,thumbnails/medium/url,title)),nextPageToken,prevPageToken',
      key: this.devKey
    };
    if (pageToken) { params['pageToken'] = pageToken; }

    return this.http.get(this.apiRef + '/search', { params });
  }

  getRecommenders(opt: any) {
    let params = {
      part: 'snippet',
      maxResults: '12',
      type: 'video',
      videoCategoryId: '10',
      videoEmbeddable: 'true',
      videoSyndicated: 'true',
      fields: 'etag,items(etag,id/videoId,snippet(channelTitle,thumbnails/medium/url,title))',
      key: this.devKey
    };
    params = {...params, ...opt}; // blog.mariusschulz.com/2016/12/23/typescript-2-1-object-rest-and-spread#object-spread-properties

    return this.http.get(this.apiRef + '/search', { params });
  }

  getVideo(videoId: string) {
    return this.http.get(this.apiRef + '/videos',
      {
        params: {
          part: 'snippet,player,statistics',
          id: videoId,
          fields: 'etag,items(etag,id,player,snippet(categoryId,description,publishedAt,tags,title,thumbnails/medium/url,channelTitle),' +
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
