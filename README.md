# alphaTube

## FRAMEWORK

### Server-Side
- nodejs

### Client-Side
#### JS
- Umbrella JS https://umbrellajs.com

CHOOSE ONE

#### CSS
- Picnic CSS https://picnicss.com

CHOOSE ONE

Legend:

O:	optional

C:	client-side

S:	server-side

?:	to ask (teacher) or to be established (team)

## VISUALIZER (presentation)

- [ ] C:	video page
	- [ ] C:	player con i controlli
- [ ] C:	ricerca video:
	- [ ] C:	per titolo
	- [ ] C:	per nome canzone
	- [ ] C:	per nome artista
	- [ ] C:	per codice youtube
- [ ] C:	Barra del menu
	- [ ] C:	info (del team, del sito...)
	- [ ] C:	catalogo
	- [ ] C:	homepage
	- [ ] O?C:	registrazione/login
	- [ ] ?:	ecc...
- [ ] C:	Info del video (da cercare su wikipedia dai dati di youtube)
	- [ ] C:	Nome canzone
	- [ ] C:	nome artista
	- [ ] C:	nome album
	- [ ] C:	anno
	- [ ] C:	codice YouTube
	- [ ] OC:	membri della band
	- [ ] OC:	genere musicale
	- [ ] OC:	durata e qualità del video
	- [ ] OC:	ecc.
- [ ] C:	Area contenuti
	- [ ] C:	scrollabile
	- [ ] C:	Descrizione del video di YouTube
	- [ ] C:	commenti di YouTube
	- [ ] C:	contenuti di DBPedia
		- [ ] OC:	sul brano
		- [ ] OC:	sull'album
		- [ ] OC:	sull'artista
		- [ ] OC:	sul genere
	- [ ] C:	tweet che menzionano il brano o l'artista
	- [ ] O?C:	instagram
	- [ ] O?C:	lyric (musicmatch, ecc...)
	- [ ] ?C:	ecc..
- [ ] C:	Area suggerimenti
	- [ ] C:	scrollabile
	- [ ] C:	Liste multiple di video prodotte da algoritmi diversi di raccomandazione. Per ogni video viene mostrato:
		- [ ] C:	un'immagine
		- [ ] C:	qualche informazione tecnica (ad esempio il titolo)
		- [ ] C:	il motivo per cui viene raccomandato.
- [ ] C:	Accessibilità
- [ ] OC:	errore 404


## RECOMMENDER (application logic)

- [ ] CS:	Gestione utenti
	- [ ] ?C:	html5 webstorage
	- [ ] S:	database statistiche
	- [ ] O?S:	database utenti
	- [ ] S:	fornire API globale
- [ ] CS:	Un modulo che genera liste di n video, 10 ≤ n ≤ 30. Usa molteplici algoritmi:
	- [ ] C:	Random: lista di video casuale (Scollegato dal video dell'area principale)
		- [ ] OC:	solo video musicali
		- [ ] C:	Output:
			- [ ] C:	Thumbnail
			- [ ] C:	titolo
			- [ ] C:	codice YouTube
			- [ ] C:	spiegazione della raccomandazione
			- [ ] OC:	artista
			- [ ] OC:	titolo
			- [ ] OC:	album
			- [ ] OC:	anno
			- [ ] OC:	genere
	- [ ] C:	Search: video che fanno match con la ricerca dell'utente (ok se n < 10)
		- [ ] C:	L'utente inserisce testo nel campo di search
		- [ ] C:	Scollegato dal video dell'area principale.
		- [ ] C:	Il sistema usa l'API di YouTube per cercare alcuni video associabili a quel testo
		- [ ] C:	Se l'utente inserisce il codice di un video, viene trovato solo quel video
		- [ ] C:	I risultati del recommender search vengono visualizzati solo se l'utente l'ha usato per cercare un video, altrimenti no.
		- [ ] C:	Output:
			- [ ] C:	Thumbnail
			- [ ] C:	titolo
			- [ ] C:	codice YouTube
			- [ ] C:	spiegazione della raccomandazione
			- [ ] OC:	artista
			- [ ] OC:	titolo
			- [ ] OC:	album
			- [ ] OC:	anno
			- [ ] OC:	genere
	- [ ] C:	Related: lista di video collegati secondo YouTube
		- [ ] ?C:	content-based
		- [ ] C:	Output:
			- [ ] C:	Thumbnail
			- [ ] C:	titolo
			- [ ] C:	codice YouTube
			- [ ] C:	spiegazione della raccomandazione
			- [ ] OC:	artista
			- [ ] OC:	titolo
			- [ ] OC:	album
			- [ ] OC:	anno
			- [ ] OC:	genere
	- [ ] ?CS:	Recent: lista di video visualizzati recentemente dall'utente (numero di elementi a scelta?)
		- [ ] S:	Il sistema ricorda quali video sono stati visualizzati recentemente dall'utente.
		- [ ] C:	Scollegato dal video dell'area principale.
		- [ ] C:	La lista è inizialmente vuota, poi si popola progressivamente di video.
		- [ ] C:	Ordinato temporalmente.
		- [ ] S:	Se lo stesso video viene visto più volte, compare una volta sola nella posizione più recente.
		- [ ] S:	Un video viene considerato visto solo se il player lo ha mostrato per più di 15 secondi.
		- [ ] S:	Se l'utente riguarda ancora lo stesso video, viene contato due volte.
		- [ ] C:	Output:
			- [ ] C:	Thumbnail
			- [ ] C:	titolo
			- [ ] C:	codice YouTube
			- [ ] C:	spiegazione della raccomandazione
			- [ ] OC:	artista
			- [ ] OC:	titolo
			- [ ] OC:	album
			- [ ] OC:	anno
			- [ ] OC:	genere
	- [ ] S:	Fvitali: lista di video proposti da un'API di Fabio Vitali
		- [ ] ?S:	approccio collaborativo
		- [ ] C:	Output:
			- [ ] C:	Thumbnail
			- [ ] C:	titolo
			- [ ] C:	codice YouTube
			- [ ] C:	spiegazione della raccomandazione
			- [ ] OC:	artista
			- [ ] OC:	titolo
			- [ ] OC:	album
			- [ ] OC:	anno
			- [ ] OC:	genere
	- [ ] S:	Popularity: raccomandazione per popolarità (di più a breve)
		- [ ] ?S:	approccio collaborativo/demografico
		- [ ] S:	assoluta
			- [ ] S:	locale: I video più visti dagli utenti del progetto
				- [ ] S:	visto solo se il player lo ha mostrato per più di 15 secondi
				- [ ] OS:	visto se somma dei secondi=15 oppure percentuale della durata
			- [ ]  O?S:	globale: I video più visti dagli utenti di tutti i progetti del corso
		- [ ] S:	relativa
			- [ ] S:	locale: I video più scelti dopo quello mostrato nell'area principale dagli utenti del progetto
				- [ ] S:	visto solo se il player lo ha mostrato per più di 15 secondi
				- [ ] OS:	visto se somma dei secondi=15 oppure percentuale della durata
			- [ ] OS:	globale: I video più scelti dopo quello mostrato nell'area principale dagli utenti di tutti i progetti del corso
		- [ ] S:	Il sistema tiene un contatore delle visualizzazione dei video da parte di tutti gli utenti, ed è in grado di elencarne i più visti.
		- [ ] ?S:	Popolarità relativa: la relazione tra il video raccomandante e il video raccomandato; relazione tra un video A e un video C passando da B?!? slide 32
		- [ ] S:	Output:
			- [ ] S:	Thumbnail
			- [ ] S:	titolo
			- [ ] S:	codice YouTube
			- [ ] S:	spiegazione della raccomandazione
			- [ ] OS:	artista
			- [ ] OS:	titolo
			- [ ] OS:	album
			- [ ] OS:	anno
			- [ ] OS:	genere
	- [ ] C:	Similarity: due (o tre) recommender diversi che ordinano dal più simile al meno simile, evitare video uguali
		- [ ] ?C:	similarità testuale
		- [ ] C:	similarità Knowledge-Based: Usate ontologie specializzate (ad es. Music Ontology http://musicontology.com)
		- [ ] C:	similarità di grafo: usare SPARQL per accedere alle info di dbpedia https://dbpedia.org/sparql oppure http://musicontology.com
		- [ ] C:	ArtistSimilarity: una lista di video dello stesso artista del video principale
			- [ ] OC:	ordinati per album
			- [ ] OC:	ordinati per anno di pubblicazione
		- [ ] C:	GenreSimilarity: una lista di video di artisti ed album simili a quelli del video principale
			- [ ] C:	Non includere video dello stesso artista
			- [ ] OC:	ordinati per vicinanza di genere
		- [ ] OC:	BandSimilarity: (solo per video di band) una lista di video di band in cui suonano membri della band del video principale
			- [ ] C:	Non includere video della stessa band.
			- [ ] OC:	ordinati per vicinanza di anno con il video principale
		- [ ] OC:	ecc...
		- [ ] C:	Output:
			- [ ] C:	Thumbnail
			- [ ] C:	titolo
			- [ ] C:	codice YouTube
			- [ ] C:	spiegazione della raccomandazione
			- [ ] OC:	artista
			- [ ] OC:	titolo
			- [ ] OC:	album
			- [ ] OC:	anno
			- [ ] OC:	genere
- [ ] S:	Lista di partenza
	- [ ] S:	Selezionare 40-50 video musicali sul wiki
		- [ ] S:	Suggerimento: scegliete brani musicali molto diversi tra loro per genere, artista ed epoca storica (includere musica classica, jazz, musiche etniche?)
	- [ ] C:	L'utente può selezionare qualunque video di YouTube, ma in prima pagina l'esaminatore può accedere ad uno dei 40-50 video di partenza scegliendolo da un apposita voce del menù e mostrare i suggerimenti su questi come partenza.
- [ ] C:	Catturare i pulsanti back and forward
	- [ ] C:	Se l'utente fa back o forward, evitate di ricaricare ogni volta tutti i dati del video che abbiamo visto pochi secondi fa.
	- [ ] C:	Usate cache e memoria locale del browser in maniera appropriata.
