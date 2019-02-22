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

  sendWatched(currentVideo:string, reason:string){
    let lastVideo = sessionStorage.getItem('lastVideo') ? sessionStorage.getItem('lastVideo') : undefined;
    sessionStorage.setItem('lastVideo', currentVideo);

    /*let lastVideo = this.lastVideoSvg;
    this.lastVideoSvg = currentVideo;*/

    if (this.reasonList.indexOf(reason) == -1){ lastVideo = reason = undefined;}
    else if (reason === 'AbsLocalPopularity' || reason === 'RelLocalPopularity'){
      reason = 'LocalPopularity';
    }
    else if (reason === 'AbsGlobalPopularity' || reason === 'RelGlobalPopularity'){
      reason = 'GlobalPopularity';
    }

    console.log(lastVideo,reason,currentVideo);

    return this.http.put(window.location.origin + '/watched', {
      begin: lastVideo,
      reason: reason,
      end: currentVideo
    });
  }
}
