import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DbpediaService {

  private dbe = 'http://dbpedia.org/sparql';
  params: string;
  
  constructor(private http: HttpClient) { }
  
  getSPARQL(){
	
	return this.http.get(this.dbe,{
	  params: {
		query: `
			PREFIX dbo: <http://dbpedia.org/ontology/>
			PREFIX dbr: <http://dbpedia.org/resource/>
			PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

			SELECT DISTINCT ?album ?abstract 
			(MIN(?release) AS ?firstRelease)
			(GROUP_CONCAT(?genre;separator="#") AS ?genres)
			WHERE{
				?album dbo:genre ?genre.
				?album dbo:releaseDate ?release.
				?album rdf:type dbo:Album.
				?album dbo:abstract ?abstract.
				?album dbo:artist dbr:Linkin_Park.
				?album dbp:type ?type.
				FILTER langMatches(lang(?abstract),"en")
				FILTER (strstarts(str(?type), "album"))
			}
			ORDER BY(?release)`,
		format: 'json'
	  }
	})
	//~ Debug purpose only
	//~ .subscribe(
	  //~ data => {
		//~ console.log(data);
	//~ });
  }
}
