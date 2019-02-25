'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">alphatube documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                        <li class="link">
                            <a href="dependencies.html" data-type="chapter-link">
                                <span class="icon ion-ios-list"></span>Dependencies
                            </a>
                        </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse" ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AboutModule.html" data-type="entity-link">AboutModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AboutModule-918505996039d600a0c7b4bf575df51e"' : 'data-target="#xs-components-links-module-AboutModule-918505996039d600a0c7b4bf575df51e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AboutModule-918505996039d600a0c7b4bf575df51e"' :
                                            'id="xs-components-links-module-AboutModule-918505996039d600a0c7b4bf575df51e"' }>
                                            <li class="link">
                                                <a href="components/AboutComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AboutComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-7fc3c42250bd39d7ca7b3dfbf453f67e"' : 'data-target="#xs-components-links-module-AppModule-7fc3c42250bd39d7ca7b3dfbf453f67e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-7fc3c42250bd39d7ca7b3dfbf453f67e"' :
                                            'id="xs-components-links-module-AppModule-7fc3c42250bd39d7ca7b3dfbf453f67e"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-7fc3c42250bd39d7ca7b3dfbf453f67e"' : 'data-target="#xs-injectables-links-module-AppModule-7fc3c42250bd39d7ca7b3dfbf453f67e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-7fc3c42250bd39d7ca7b3dfbf453f67e"' :
                                        'id="xs-injectables-links-module-AppModule-7fc3c42250bd39d7ca7b3dfbf453f67e"' }>
                                        <li class="link">
                                            <a href="injectables/LyricsService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>LyricsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/HomeModule.html" data-type="entity-link">HomeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-HomeModule-097d9160054293ebc0a86de89a0a29bb"' : 'data-target="#xs-components-links-module-HomeModule-097d9160054293ebc0a86de89a0a29bb"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HomeModule-097d9160054293ebc0a86de89a0a29bb"' :
                                            'id="xs-components-links-module-HomeModule-097d9160054293ebc0a86de89a0a29bb"' }>
                                            <li class="link">
                                                <a href="components/HomeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/Page404Module.html" data-type="entity-link">Page404Module</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-Page404Module-e70348586bf5a1ef0d0325aabea3f917"' : 'data-target="#xs-components-links-module-Page404Module-e70348586bf5a1ef0d0325aabea3f917"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-Page404Module-e70348586bf5a1ef0d0325aabea3f917"' :
                                            'id="xs-components-links-module-Page404Module-e70348586bf5a1ef0d0325aabea3f917"' }>
                                            <li class="link">
                                                <a href="components/Page404Component.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">Page404Component</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PageModule.html" data-type="entity-link">PageModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PageSharedModule.html" data-type="entity-link">PageSharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PageSharedModule-1019b37e3fde4829f97848d04088e515"' : 'data-target="#xs-components-links-module-PageSharedModule-1019b37e3fde4829f97848d04088e515"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PageSharedModule-1019b37e3fde4829f97848d04088e515"' :
                                            'id="xs-components-links-module-PageSharedModule-1019b37e3fde4829f97848d04088e515"' }>
                                            <li class="link">
                                                <a href="components/NavbarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NavbarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SearchModule.html" data-type="entity-link">SearchModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SearchModule-338112395d113e3dc6c0fc6060fd2bbd"' : 'data-target="#xs-components-links-module-SearchModule-338112395d113e3dc6c0fc6060fd2bbd"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SearchModule-338112395d113e3dc6c0fc6060fd2bbd"' :
                                            'id="xs-components-links-module-SearchModule-338112395d113e3dc6c0fc6060fd2bbd"' }>
                                            <li class="link">
                                                <a href="components/SearchComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SearchComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/VideopageModule.html" data-type="entity-link">VideopageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-VideopageModule-880f40d39981c0046bdfd38a90beae03"' : 'data-target="#xs-components-links-module-VideopageModule-880f40d39981c0046bdfd38a90beae03"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-VideopageModule-880f40d39981c0046bdfd38a90beae03"' :
                                            'id="xs-components-links-module-VideopageModule-880f40d39981c0046bdfd38a90beae03"' }>
                                            <li class="link">
                                                <a href="components/PlayerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PlayerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RecommenderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RecommenderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VideopageComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">VideopageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WikiboxComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WikiboxComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AlphalistService.html" data-type="entity-link">AlphalistService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AtlasService.html" data-type="entity-link">AtlasService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DbpediaService.html" data-type="entity-link">DbpediaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SimilarityService.html" data-type="entity-link">SimilarityService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TwitterService.html" data-type="entity-link">TwitterService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/YoutubeService.html" data-type="entity-link">YoutubeService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});