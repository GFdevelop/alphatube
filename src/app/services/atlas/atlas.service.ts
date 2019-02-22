import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AtlasService {
  public random = 'Random';
  public search = 'Search';
  public related = 'Related';
  public recent = 'Recent';
  public fvitali = 'Fvitali';
  public absGlobPop = 'AbsGlobalPopularity';
  public absLocalPop = 'AbsLocalPopularity';
  public relGlobPop = 'RelGlobalPopularity';
  public relLocalPop = 'RelLocalPopularity';
  public artSimilarity = 'ArtistSimilarity';
  public genSimilarity = 'GenereSimilarity';

  constructor(
    private http: HttpClient
  ) { }

  // ~ getId(id: string) {
    // ~ return this.http.get(window.location.origin + '/crazy', {
      // ~ params: {
        // ~ user: id
      // ~ }
    // ~ });
  // ~ }

  sendTuple(currentVideo:string, reason:string, lastVideo?: string){
    // ~ let lastVideo;
    // ~ try { lastVideo = JSON.parse(sessionStorage.getItem('lastVideo'));}
    // ~ catch { lastVideo = null;}
    // ~ sessionStorage.setItem('lastVideo' , JSON.stringify(currentVideo));

    // ~ try {
      // ~ if (reason == this.absLocalPop ||
          // ~ reason == this.relLocalPop)
      // ~ { reason = 'LocalPopularity' }
      // ~ else if ( reason == this.absGlobPop  ||
                // ~ reason == this.relGlobPop)
      // ~ { reason = 'GlobalPopularity' }
      // ~ else if ( reason == this.artSimilarity ||
                // ~ reason == this.genSimilarity)
      // ~ { reason = 'Similarity' }
      // ~ else if ( reason != this.random  &&
                // ~ reason != this.search  &&
                // ~ reason != this.related &&
                // ~ reason != this.recent  &&
                // ~ reason != this.fvitali)
      // ~ { reason = this.random; }
    // ~ }
    // ~ catch { reason = this.random; }

    return this.http.put(window.location.origin + '/watched', {
      begin: lastVideo,
      reason: reason,
      end: currentVideo
    });
  }
}
