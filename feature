leggenda:
S: server-side
C: client-side


# PRESENTATION
C: homepage
C: pagina video
C: pagina info del team
C: errore 404
S: pagina registrazione/login (opzionale 1)
C: API instagram? (opzionale 2)
 : accessibilità

# APPLICATION LOGIC
C: ricerca informazioni (wikipedia (artista,nome,album), musicmatch, twitter, ecc...)
C: algoritmi di correlazione (youtube, API di altri progetti, ecc...)
	-Content-based
	-Filtraggio collaborativo
	-Approccio demografico
	-Approccio knowledge-based
	-Approccio community-based
	-Recommender system ibridi
	-similarità di
	escludere informazioni irrilevanti (o già viste)
C: mashup
S: fornire (e usare) API globale
S: gestione ID utenti (ID riconosciuto o nuovo ID)

# STORAGE
S: statistiche
C: html5 webstorage
S: db utenti (opzionale 1)


# VISUALIZER
player con i controlli
ricerca video per titolo, nome canzone, nome artista, codice youtube
Barra del menu
	info
	catalogo
	ecc...(sitemap?!?)
Info del video (da cercare su wikipedia dai dati di youtube)
	Nome canzone, nome artista, nome album, anno, codice YouTube, membr della band, genere musicale, durata e qualità del video, ecc.
Area contenuti (con scroll)
	Descrizione del video di YouTube, commenti di YouTube, contenuti di DBPedia sul brano, sull'album, sull'artista, sul genere, tweet che menzionano il brano o l'artista, ecc..
Area suggerimenti (con scroll)
	Liste multiple di video prodotte da algoritmi diversi di raccomandazione. Per ogni video viene mostrato un'immagine, qualche informazione tecnica (ad esempio il titolo) e il motivo per cui viene raccomandato.

# RECOMMENDER
Un modulo che genera liste di n video, 10 ≤ n ≤ 30. Usa molteplici algoritmi:
	Thumbnail, titolo, codice YouTube, spiegazione della raccomandazione, artista, titolo, album, anno, genere.
	– Random: lista di video casuale (Scollegato dal video dell'area principale. solo video musicali)
	– Search: video che fanno match con la ricerca dell'utente (ok se n < 10)
		• L'utente inserisce testo nel campo di search
		• Scollegato dal video dell'area principale.
		• Il sistema usa l'API di YouTube per cercare alcuni video associabili a quel testo
		• Se l'utente inserisce il codice di un video, viene trovato solo quel video
		• I risultati del recommender search vengono visualizzati solo se l'utente l'ha usato per cercare un video, altrimenti no.
	– Related: lista di video collegati secondo YouTube
	– Recent: lista di video visualizzati recentemente dall'utente (numero di elementi a scelta?)
		• Il sistema ricorda quali video sono stati visualizzati recentemente dall'utente.
		• Scollegato dal video dell'area principale.
		• La lista è inizialmente vuota, poi si popola progressivamente di video.
		• Ordinato temporalmente.
		• Se lo stesso video viene visto più volte, compare una volta sola nella posizione più recente.
		• Un video viene considerato visto solo se il player lo ha mostrato per più di 15 secondi (o percentuale vista). Se l'utente riguarda ancora lo stesso video, viene contato due volte.
	– Fvitali: lista di video proposti da un'API di Fabio Vitali
		Popolarità globale: API globale
	– Popularity: raccomandazione per popolarità assoluta, relativa locale e relativa globale (di più a breve)
		Quattro recommender per raccomandare i video più popolari sulla base di quattro criteri diversi (assoluta-relativa join locale-globale)
		Il sistema tiene un contatore delle visualizzazione dei video da parte di tutti gli utenti, ed è in grado di elencarne i più visti.
		Popolarità relativa: la relazione tra il video raccomandante e il video raccomandato; relazione tra un video A e un video C passando da B?!? slide 32
	– Similarity (artista, genere, membri della band, ecc.): lista di video dello stesso artista, dello stesso genere (altri artisti simili), di band in cui suonano alcuni membri della stessa band, ecc.
	FORNIRE UNA SPIEGAZIONE DEL SUGGERIMENTO
Lista di partenza
• In un sistema reale tutti i video assumono naturalmente una storia di visualizzazioni sulla base della quale basare la raccomandazione.
• Noi siamo pochi e abbiamo poco tempo, e per dimostrare che il sistema funziona dobbiamo creare una situazione fittizia di video molto commentati.
• La classe intera deve quindi selezionare 40-50 video musicali, da specificare su un'apposita pagina del wiki, su cui si concentreranno gli sforzi iniziali del progetto.
• Suggerimento: scegliete brani musicali molto diversi tra loro per genere, artista ed epoca storica (includere musica classica, jazz, musiche etniche?)
• L'utente può selezionare qualunque video di YouTube, ma in prima pagina l'esaminatore può accedere ad uno dei 40-50 video di partenza scegliendolo da un apposita voce del menù e mostrare i suggerimenti su questi come partenza.
