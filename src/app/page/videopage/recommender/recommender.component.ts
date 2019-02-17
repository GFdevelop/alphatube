import { Component, OnInit, ViewEncapsulation, HostListener} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// ~ import { of } from 'rxjs';

import { AlphalistService } from '../../../services/alphalist/alphalist.service';
import { YoutubeService } from '../../../services/youtube/youtube.service';
// file json con playlist
//import * as data from '../../../page/videopage/recommender/playlist.json';


@Component({
  selector: 'app-recommender',
  templateUrl: './recommender.component.html',
  styleUrls: ['./recommender.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RecommenderComponent implements OnInit {

  nVideo = 12;
  r10s: any;
    //~ [x]   random: any[],
    //~ [x]   search: any[],
    //~ [x]   related: any[],
    //~ [x]   recent: any[],
    //~ [x]   fvitali: any[],
    //~ [x]   absoulute global popularity: any[],
    //~ []    absoulute local popularity: any[],
    //~ [x]   relative global popularity: any[],
    //~ []    relative local popularity: any[],
    //~ []    artist similarity: any[],
    //~ []    genere similarity: any[],

  constructor(
    private alphalistService: AlphalistService,
    private route: ActivatedRoute,
    private ytService: YoutubeService
  ) { }

  ngOnInit() {
    this.r10s = {};
    this.route.params.subscribe( params => {

      // random
      let idPlay = { //playlist possibili
        playlists:[
          {"playlistId":"PLUg_BxrbJNY5gHrKsCsyon6vgJhxs72AH"},
          {"playlistId":"PLVXq77mXV53-Np39jM456si2PeTrEm9Mj"},
          {"playlistId":"PLTAOP-hZyrHtWfeOJVAvoN5OnuzNNQ0Yw"},
          {"playlistId":"PLTDluH66q5mpm-Bsq3GlwjMOHITt2bwXE"},
          {"playlistId":"PLS_oEMUyvA728OZPmF9WPKjsGtfC75LiN"},
          {"playlistId":"PLLMA7Sh3JsOQQFAtj1no-_keicrqjEZDm"},
          {"playlistId":"PLq-ZRVZ1W4Fesh7aKXj8np40uUZJTGBmR"},
          {"playlistId":"PLA-94DyrXTGigxYXPXnRXDDSZ-K0sJxMn"},
          {"playlistId":"PLC0w3lEHx2SF3NsbnqnLbWBWyF_3g0cjZ"},
          {"playlistId":"PLmuBNwnyyiySB56boer3K2a5B83CqUjA4"},
          {"playlistId":"PLGdZ-INw7mfA3VjyfA0I24xhEuh8UuZWa"}
        ]
      }

      // id playlist casuale da playlists
      let idPlaytmp= idPlay.playlists[Math.floor(Math.random()*idPlay.playlists.length)].playlistId;
      this.ytService.getPlaylist(idPlaytmp).subscribe(
        //data sono i 30 video presi dalla playlist, tramite getPlaylist da youtube.service
        (data:any)=>{
            let randomListVideoId = [];
            let i=0;
            //finche non sono stati inseriti 12 video
            while(i< 20 && data.items.length !=0 ){
              //metto dentro all'array degli id dei video, id di video casuali tramite data.items
              randomListVideoId[i]=data.items.splice(Math.floor(Math.random()*data.items.length), 1)[0].snippet.resourceId.videoId;
              i=i+1;
            }
            this.ytService.getVideo(randomListVideoId.join()).subscribe( // joins all the elements of an array into a string
              (obj: any) => {
                obj = this.ytService.fromYT(this.ytService.filterVideo(obj));
                if (obj) this.r10s['Random'] = obj;
              },
              error => console.log(error)
            );
        }
      )

      // search
      if (localStorage.q) {
        this.ytService.getRecommenders({q: localStorage.q}).subscribe(
          (data: any) => this.r10s['Search'] = this.ytService.fromYT(data).filter(
            obj => obj.videoID !== params.videoId
          ),
          error => console.log(error)
        );
      }

      // related
      this.ytService.getRecommenders({relatedToVideoId: params.videoId, maxResults: this.nVideo}).subscribe(
        (data: any) => this.r10s['Related'] = this.ytService.fromYT(data),
        error => console.log(error)
      );

      // recent
      //salvo in lastWatched le stringhe parsate in JSON di localStorage
      let lastWatched = JSON.parse(localStorage.getItem('lastWatched'));
      //se lastWatched contiene qualcosa
      if (lastWatched.length !=0){
      //Passo l'array lastWatched trasformato in un unica stringa di videoId concatenati
      //a getVideo,  che fa la richiesta a YT che ritorna tutto l'oggetto
        this.ytService.getVideo(lastWatched.join()).subscribe(
        //subscribe permette di dare tempo al programma di rispondere, in modo asincrono
          (data:any) => {
          //mette dentro all array r10s i video filtrati per non mettere il video corrente prendendo i valori con fromYT
            let filtered = this.ytService.fromYT(this.ytService.filterVideo(data)).filter(
              obj => obj.videoID != params.videoId
            );
            if (filtered.length) this.r10s['Recent'] = filtered;
          },
          error => console.log(error)
        );
      }

      // fvitali
      this.alphalistService.getFV(params.videoId).subscribe(
        (data: any) => {
          let idList = [];
          data.recommended.forEach(
            function (value, index) {idList[index]=data.recommended[index].videoID;}
          );
          this.ytService.getVideo(idList.join()).subscribe(
            (obj: any) => {
              let tmpList = this.ytService.fromYT(this.ytService.filterVideo(obj));
              for (let i in tmpList){
                tmpList[i].reason =
                data.recommended.filter(
                  function (element){
                    return element.videoID == tmpList[i].videoID;
                  }
                )[0].prevalentReason;
              }
              this.r10s['Fvitali'] = tmpList;
            },
            error => console.log(error)
          );
        },
        error => console.log(error)
      );

      //let siteCode = ['1822','1823','1824','1827','1828','1829','1830','1831','1834','1836','1838','1839','1846','1847','1848','1849','1850','1851','1859','1861','1862','1863','1901','1904','1906'];
      let siteCode = ['1823','1827','1828','1831','1834','1838','1839','1846','1847','1863','1901','1906'];

      // TODO: use for globpopList.json
      /*this.alphalistService.getList().subscribe(
        (data: any) =>{
          this.popularity('absoulute global popularity','', data.globpop);
          this.popularity('relative global popularity',params.videoId, data.globpop);
        },
        error => console.log(error)
      );*/

      this.popularity('AbsGlobalPopularity','', siteCode);
      this.popularity('RelGlobalPopularity',params.videoId, siteCode);

      //this.popularity('AbsLocalPopularity','', '1826');
      //this.popularity('RelLocalPopularity',params.videoId, '1826');

    });
  }

  popularity(recommender:string, query:string, siteCode:any){
    let siteNumber=siteCode.length, popList = [];
    for(let i in siteCode){
      this.alphalistService.getGlobpop(siteCode[i],query).subscribe(
        (data: any) => {
          for(let i in data.recommended){ this.addList(popList, data.recommended[i]);}
          siteNumber = this.YTInfo(popList,siteNumber,recommender,query);
        },
        error => { console.log(error); siteNumber = this.YTInfo(popList,siteNumber,recommender,query);}
      );
    }
  }

  addList(videoList: any, video: any){
    if(!video.videoId) video = this.adjustAlphaList(video);
    for (let i = 0; i<videoList.length && video; i++){
      if (videoList[i].videoId == video.videoId) {
        videoList[i].timesWatched = videoList[i].timesWatched + video.timesWatched;
        video = null;
      }
    }
    if (video) videoList.push(video);
    videoList = videoList.sort((n1,n2) => {if(n1.timesWatched < n2.timesWatched) return 1; else return -1;});
  }

  YTInfo(videoList: any, nSite:any, recommender:any, query:any){
    nSite--;
    if (nSite <= 0){
      let popIdList = [];
      videoList = videoList.slice(0,20);
      for(let i in videoList){ popIdList[i] = videoList[i].videoId;}

      this.ytService.getVideo(popIdList.join()).subscribe(
        (data: any) => {
          let tmpData = this.ytService.fromYT(this.ytService.filterVideo(data));
          for (let i in tmpData){
            let reason = videoList.filter(function (element){return tmpData[i].videoID == element.videoId;})[0];
            if (query == ''){ tmpData[i].reason = reason.timesWatched + ' times watched';}
            else { tmpData[i].reason = 'Prevalent reason: ' + reason.prevalentReason;}
          }
          this.r10s[recommender] = tmpData;
        },
        error => console.log(error)
      );
    }
    return nSite;
  }

  adjustAlphaList(data: any){
    return{
      videoId: data.videoID,
      timesWatched: data.timesWatched,
      prevalentReason: data.prevalentReason,
      lastSelected: data.lastSelected
    }
  }

}
