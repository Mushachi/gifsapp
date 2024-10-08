import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

// const TENOR_API_KEY = 'AIzaSyD6VlY2SH8kOJEFwhnlkrn44WIg0XKnHk0';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  // Desde API Tenor https://developers.google.com/tenor/guides/quickstart?hl=es-419
  // private apiKey: string = 'AIzaSyD6VlY2SH8kOJEFwhnlkrn44WIg0XKnHk0';

  // Desde API Giphy
  private apiKey: string = 'i3CcKRdfhUyt3oYU20Znn00m7PCsewDW';
  private serviceUrl: string = 'http://api.giphy.com/v1/gifs';

  constructor( private http: HttpClient ) {
    this.loadLocalStorage();

    this.searchTag(this._tagsHistory[0]);
    console.log('Gifs Service Ready');
   }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private organizaHistorial( tag: string ) {
    tag = tag.toLowerCase();

    if ( this._tagsHistory.includes(tag) ) {
      this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !== tag );
    }

    this._tagsHistory.unshift( tag );
    this._tagsHistory = this.tagsHistory.splice(0,10);
    this.saveLocalStorage();
  }

  searchTag2( tag: string ):void {
    if ( tag.length === 0 ) return;

    // this._tagsHistory.unshift( tag );
    this.organizaHistorial(tag);

    // console.log(this.tagsHistory);
  }

  async searchTag3( tag: string ):Promise<void> {
    if ( tag.length === 0 ) return;
    this.organizaHistorial(tag);


    fetch('http://api.giphy.com/v1/gifs/search?api_key=i3CcKRdfhUyt3oYU20Znn00m7PCsewDW&q=goku&limit=10')
      .then( resp => resp.json() )
      .then( data => console.log(data) );
  }

  async searchTag4( tag: string ):Promise<void> {
    if ( tag.length === 0 ) return;
    this.organizaHistorial(tag);


    const resp = await fetch('http://api.giphy.com/v1/gifs/search?api_key=i3CcKRdfhUyt3oYU20Znn00m7PCsewDW&q=goku&limit=10');
    const data = await resp.json();
    // console.log(data);
  }

  private saveLocalStorage():void {
    localStorage.setItem('history', JSON.stringify(this.tagsHistory));
  }

  private loadLocalStorage():void {
    if( !localStorage.getItem('history') ) return;

    this._tagsHistory = JSON.parse( localStorage.getItem('history')! );
  }

  async searchTag( tag: string ):Promise<void> {
    if ( tag.length === 0 ) return;
    this.organizaHistorial(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey )
      .set('limit', '10' )
      .set('q', tag )

    this.http.get<SearchResponse>(`${ this.serviceUrl }/search`, { params: params })
      .subscribe( resp => {

        this.gifList = resp.data;

        // console.log(resp);
        // console.log({ gifs: this.gifList });
      });
  }



}
