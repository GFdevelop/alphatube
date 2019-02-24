# alphaTube

## FRAMEWORK

### Server-Side
- Node.js v8.10 (https://nodejs.org/)

### Client-Side
#### JS
- Bootstrap v4.1.0 (https://getbootstrap.com/)
- jQuery JavaScript Library v3.3.1 (https://jquery.com/)

#### CSS
- Bootstrap v4.1.0 (https://getbootstrap.com/)

Legend:
O:  optional
C:  client-side
S:  server-side
?:  to ask (teacher) or to be established (team)

## VISUALIZER (presentation)

- [x] C:    video page
    - [x] C:    player con i controlli
- [x] C:    ricerca video:
    - [x] C:    per titolo (canzone e artista)
    - [x] C:    per codice youtube
- [x] C:    Barra del menu
    - [x] C:    info (del team, del sito...)
    - [x] C:    homepage
- [x] C:    Info del video (da cercare su wikipedia dai dati di youtube)
    - [x] C:    Nome canzone
    - [x] C:    nome artista
    - [x] C:    nome album
    - [x] OC:   genere musicale
- [x] C:    Area contenuti
    - [x] C:    scrollabile
    - [x] C:    Descrizione del video di YouTube
    - [x] C:    commenti di YouTube
    - [x] C:    contenuti di DBPedia
        - [x] OC:   sul brano
        - [x] OC:   sull'album
        - [x] OC:   sull'artista
        - [x] OC:   sul genere
    - [x] OC:   tweet che menzionano il brano o l'artista
    - [x] O?C:  lyric (musicxmatch, ecc...)
- [x] C:    Area suggerimenti
    - [x] C:    scrollabile
    - [x] C:    Liste multiple di video prodotte da algoritmi diversi di raccomandazione. Per ogni video viene mostrato:
        - [x] C:    un'immagine
        - [x] C:    qualche informazione tecnica (ad esempio il titolo)
        - [x] C:    il motivo per cui viene raccomandato.
- [x] OC:    Accessibilità
- [x] OC:   errore 404


## RECOMMENDER (application logic)

- [x] CS:   Gestione utenti
    - [x] ?C:   html5 webstorage
    - [x] S:    database statistiche
    - [x] S:    fornire API globale
- [x] CS:   Un modulo che genera liste di n video, 10 ≤ n ≤ 30. Usa molteplici algoritmi:
    - [x] C:    Random: lista di video casuale (Scollegato dal video dell'area principale)
        - [x] OC:   solo video musicali
        - [x] C:    Output:
            - [x] C:    Thumbnail
            - [x] C:    titolo
            - [x] C:    codice YouTube
            - [x] C:    spiegazione della raccomandazione
    - [x] C:    Search: video che fanno match con la ricerca dell'utente (ok se n < 10)
        - [x] C:    L'utente inserisce testo nel campo di search
        - [x] C:    Scollegato dal video dell'area principale.
        - [x] C:    Il sistema usa l'API di YouTube per cercare alcuni video associabili a quel testo
        - [x] C:    Se l'utente inserisce il codice di un video, viene trovato solo quel video
        - [x] C:    I risultati del recommender search vengono visualizzati solo se l'utente l'ha usato per cercare un video, altrimenti no.
        - [x] C:    Output:
            - [x] C:    Thumbnail
            - [x] C:    titolo
            - [x] C:    codice YouTube
            - [x] C:    spiegazione della raccomandazione
    - [x] C:    Related: lista di video collegati secondo YouTube
        - [x] ?C:   content-based
        - [x] C:    Output:
            - [x] C:    Thumbnail
            - [x] C:    titolo
            - [x] C:    codice YouTube
            - [x] C:    spiegazione della raccomandazione
    - [x] ?CS:  Recent: lista di video visualizzati recentemente dall'utente (numero di elementi a scelta?)
        - [x] S:    Il sistema ricorda quali video sono stati visualizzati recentemente dall'utente.
        - [x] C:    Scollegato dal video dell'area principale.
        - [x] C:    La lista è inizialmente vuota, poi si popola progressivamente di video.
        - [x] C:    Ordinato temporalmente.
        - [x] S:    Se lo stesso video viene visto più volte, compare una volta sola nella posizione più recente.
        - [x] S:    Un video viene considerato visto solo se il player lo ha mostrato per più di 15 secondi.
        - [x] S:    Se l'utente riguarda ancora lo stesso video, viene contato due volte.
        - [x] C:    Output:
            - [x] C:    Thumbnail
            - [x] C:    titolo
            - [x] C:    codice YouTube
            - [x] C:    spiegazione della raccomandazione
    - [x] S:    Fvitali: lista di video proposti da un'API di Fabio Vitali
        - [x] ?S:   approccio collaborativo
        - [x] C:    Output:
            - [x] C:    Thumbnail
            - [x] C:    titolo
            - [x] C:    codice YouTube
            - [x] C:    spiegazione della raccomandazione
    - [x] S:    Popularity: raccomandazione per popolarità (di più a breve)
        - [x] ?S:   approccio collaborativo/demografico
        - [x] S:    assoluta
            - [x] S:    locale: I video più visti dagli utenti del progetto
                - [x] S:    visto solo se il player lo ha mostrato per più di 15 secondi
                - [x] OS:   visto se somma dei secondi=15
            - [x]  O?S: globale: I video più visti dagli utenti di tutti i progetti del corso
        - [x] S:    relativa
            - [x] S:    locale: I video più scelti dopo quello mostrato nell'area principale dagli utenti del progetto
                - [x] S:    visto solo se il player lo ha mostrato per più di 15 secondi
                - [x] OS:   visto se somma dei secondi=15
            - [x] OS:   globale: I video più scelti dopo quello mostrato nell'area principale dagli utenti di tutti i progetti del corso
        - [x] S:    Il sistema tiene un contatore delle visualizzazione dei video da parte di tutti gli utenti, ed è in grado di elencarne i più visti.
        - [x] ?S:   Popolarità relativa: la relazione tra il video raccomandante e il video raccomandato; relazione tra un video A e un video C passando da B
        - [x] S:    Output:
            - [x] S:    Thumbnail
            - [x] S:    titolo
            - [x] S:    codice YouTube
            - [x] S:    spiegazione della raccomandazione
    - [x] C:    Similarity: due (o tre) recommender diversi che ordinano dal più simile al meno simile, evitare video uguali
        - [x] ?C:   similarità testuale
        - [x] C:    similarità Knowledge-Based: Usate ontologie specializzate (ad es. Music Ontology http://musicontology.com)
        - [x] C:    similarità di grafo: usare SPARQL per accedere alle info di dbpedia https://dbpedia.org/sparql oppure http://musicontology.com
        - [x] C:    ArtistSimilarity: una lista di video dello stesso artista del video principale
        - [x] C:    GenreSimilarity: una lista di video di artisti ed album simili a quelli del video principale
            - [x] C:    Non includere video dello stesso artista
        - [x] OC:   BandSimilarity: (solo per video di band) una lista di video di band in cui suonano membri della band del video principale
            - [x] C:    Non includere video della stessa band.
- [x] S:    Lista di partenza
    - [x] S:    Selezionare 40-50 video musicali sul wiki
        - [x] S:    Suggerimento: scegliete brani musicali molto diversi tra loro per genere, artista ed epoca storica (includere musica classica, jazz, musiche etniche?)
    - [x] C:    L'utente può selezionare qualunque video di YouTube, ma in prima pagina l'esaminatore può accedere ad uno dei 40-50 video di partenza scegliendolo da un apposita voce del menù e mostrare i suggerimenti su questi come partenza.
- [x] C:    Catturare i pulsanti back and forward
    - [x] C:    Se l'utente fa back o forward, evitate di ricaricare ogni volta tutti i dati del video che abbiamo visto pochi secondi fa.
    - [x] C:    Usate cache e memoria locale del browser in maniera appropriata.
