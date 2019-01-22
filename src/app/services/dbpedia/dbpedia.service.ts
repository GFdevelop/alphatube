import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DbpediaService {

  private dbe = 'http://dbpedia.org/sparql';
  params: string;

  constructor(private http: HttpClient) { }

  getSingerInfo(singer: string) {
		return this.http.get(this.dbe, {
			params: {
				query: `
					SELECT DISTINCT ?abstract
					(GROUP_CONCAT(?genre;separator="#") AS ?genres)
					WHERE{
						?artist foaf:name "` + this.singer + `"@en.
						?artist dbo:genre ?genre.
						?artist dbo:abstract ?abstract.
						FILTER langMatches(lang(?abstract),"en")
					}`,
				format: 'json'
			}
		});
  }
  
  getSongInfo(song: string) {
		return this.http.get(this.dbe, {
			params: {
				query: `
					`,
				format: 'json'
			}
		});
  }
  
  getAlbumInfo(album: string) {
		return this.http.get(this.dbe, {
			params: {
				query: `
					`,
				format: 'json'
			}
		});
  }
  
  getGenreInfo(genre: string) {
		return this.http.get(this.dbe, {
			params: {
				query: `
					`,
				format: 'json'
			}
		});
  }
  
}
