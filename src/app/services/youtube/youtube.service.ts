import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class YoutubeService {

  apiRef = 'https://www.googleapis.com/youtube/v3';
  devKey = 'AIzaSyCZIY9kX67U3u3wtgrO3FviBD_uIm5AQao';   // TODO: the key must be retrived from the server!!!

  constructor(private http: HttpClient) { }

  getSearch(opt: any) {
    let params = {
      part: 'snippet',
      maxResults: '12',
      type: 'video',
      videoCategoryId: '10',
      videoEmbeddable: 'true',
      videoSyndicated: 'true',
      fields: 'etag,items(etag,id/videoId,snippet(channelTitle,publishedAt,thumbnails/medium/url,title)),nextPageToken,prevPageToken',
      key: this.devKey
    };
    params = {...params, ...opt}; // blog.mariusschulz.com/2016/12/23/typescript-2-1-object-rest-and-spread#object-spread-properties

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
      fields: 'etag,items(etag,id/videoId,snippet(channelTitle,publishedAt,thumbnails/medium/url,title)),nextPageToken,prevPageToken',
      key: this.devKey
    };
    params = {...params, ...opt}; // blog.mariusschulz.com/2016/12/23/typescript-2-1-object-rest-and-spread#object-spread-properties

    return this.http.get(this.apiRef + '/search', { params }).pipe(map(
      (data: any) => {
        let results: {artist: string, title: string, videoID: string, img: string}[] = [];
        for (let i in data.items) {
          results.push(
            {
              artist: data.items[i].snippet.channelTitle,
              title: data.items[i].snippet.title,
              videoID: data.items[i].id.videoId,
              img: data.items[i].snippet.thumbnails.medium.url
            }
          );
        }
        return results;
      }
    ));
  }

  objTransform(obj: any) {
    return {
      artist: obj.snippet.channelTitle,
      title: obj.snippet.title,
      videoID: obj.id.videoId
    }
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
