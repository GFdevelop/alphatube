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
          part: 'snippet,player,statistics,status,contentDetails',
          id: videoId,
          fields: 'etag,items(etag,id,player,snippet(categoryId,description,publishedAt,tags,title,thumbnails/medium/url,channelTitle),' +
                  'statistics(dislikeCount,likeCount,viewCount),status(embeddable,license,privacyStatus,publicStatsViewable),contentDetails(regionRestriction(blocked))),visitorId',
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

  // richiesta al sito per una particolare playlist
  // this.apiref è quello oche va da https a v3, quindi inseriremo dentro a params quello che ci serve
  // torna 30 elementi della playlist
   getPlaylist(playlistID: string) {
     let params = {
       part: 'snippet',
       maxResults: '30',
       playlistId: playlistID,
       key: this.devKey
     };
     // part=snippet%2C+id&maxResults=30&playlistId=' + randomPlaylistId + '&key=' + API_KEY
     return this.http.get(this.apiRef + '/playlistItems',{params})
   }

   filterVideo(data: any) {
     for(let i=0; i < data.items.length; i++){
       try {
         if (!data.items[i].status.embeddable || // se è possibile metterlo nell'iframe
             !data.items[i].contentDetails.regionRestriction.blocked.filter( obj => obj == 'IT')) // se è possibile essere visualizzato in questo paese
         { data.items.splice(i,1); i--;} // TODO: check based on country
       } catch{}
     }
     return data;
   }

   fromYT(data: any) {
     let results: {artist: string, title: string, videoID: string, img: string, reason: string}[] = [];
     for (let i in data.items) {
       results.push(
         {
           artist: data.items[i].snippet.channelTitle,
           title: data.items[i].snippet.title,
           videoID: (data.items[i].id.videoId) ? data.items[i].id.videoId : data.items[i].id,
           img: data.items[i].snippet.thumbnails.medium.url,
           reason: ''
         }
       );
     }
     return results;
   }
}
