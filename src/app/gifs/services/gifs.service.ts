import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _tagsHistory: string[] = [];

  constructor() { }

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
  }

  searchTag( tag: string ):void {
    if ( tag.length === 0 ) return;

    // this._tagsHistory.unshift( tag );
    this.organizaHistorial(tag);

    console.log(this.tagsHistory);
  }

}
