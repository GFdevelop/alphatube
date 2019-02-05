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
					SELECT DISTINCT ?abstract ?genre
					(GROUP_CONCAT(?genre;separator="#") AS ?genres)
					WHERE{
						?artist foaf:name "` + singer + `"@en.
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
					SELECT DISTINCT ?abstract
					WHERE{
						?song foaf:name "` + song + `"@en.
						?song dbo:abstract ?abstract.
						FILTER langMatches(lang(?abstract),"en")
					}`,
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
	  console.log(genre);
		return this.http.get(this.dbe, {
			params: {
				query: `
				SELECT DISTINCT ?abstract
					WHERE{
						?genre foaf:name "` + genre + `"@en.
						?genre dbo:abstract ?abstract.
						FILTER langMatches(lang(?abstract),"en")
					}`,
				format: 'json'
			}
		});
  }
  
}
