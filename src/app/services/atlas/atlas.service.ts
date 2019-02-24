import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AtlasService {
  public reasonList = [
    'Random',
    'Search',
    'Related',
    'Recent',
    'Fvitali',
    'AbsGlobalPopularity',
    'RelGlobalPopularity',
    'AbsLocalPopularity',
    'RelLocalPopularity',
    'ArtistSimilarity',
    'GenereSimilarity',
    'BandSimilarity'
  ]

  private lastVideoSvg = undefined

  constructor(
    private http: HttpClient
  ) { }

  getId(id: string) {
    return this.http.get(window.location.origin + '/crazy', {
      params: {
        user: id
      }
    });
  }

  sendWatched(currentVideo:string, reason:string){
    let lastVideo = sessionStorage.getItem('lastVideo') ? sessionStorage.getItem('lastVideo') : undefined;
    sessionStorage.setItem('lastVideo', currentVideo);

    /*let lastVideo = this.lastVideoSvg;
    this.lastVideoSvg = currentVideo;*/

    if ((this.reasonList.indexOf(reason) === -1) || (lastVideo === currentVideo)){ lastVideo = reason = undefined;}
    else if (reason === 'AbsLocalPopularity' || reason === 'RelLocalPopularity'){
      reason = 'LocalPopularity';
    }
    else if (reason === 'AbsGlobalPopularity' || reason === 'RelGlobalPopularity'){
      reason = 'GlobalPopularity';
    }

    console.log(lastVideo,reason,currentVideo);

    return this.http.put(window.location.origin + '/watched', {
      params: {
        begin: lastVideo,
        reason: reason,
        end: currentVideo
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
