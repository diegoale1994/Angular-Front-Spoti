import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Papa } from 'ngx-papaparse';
import { map } from 'rxjs/operators';
import { constantes } from "./../../environments/environment";
import { SlicePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  tiempo: any[] = [];
  codigoAutoizacion: string = "";
  token: any;
  tokenState: boolean;
  //let httpHeaders = new HttpHeaders({'Content-Type','application/x-www-form-urlencoded'});

  constructor(private http: HttpClient, private papa: Papa, private slicePipe: SlicePipe) {
    this.http.get('https://spotify-get-token.herokuapp.com/spotify/4474bdb003324ef791e9c71684585196/b2db5018e1f9443e8630c8972a78fba5')
      .subscribe((response: any) => {
        this.token = response.access_token;
      })
  }

  getToken() {
    return this.http.get('https://spotify-get-token.herokuapp.com/spotify/4474bdb003324ef791e9c71684585196/b2db5018e1f9443e8630c8972a78fba5');
  }
  setToken(token: any) {
    this.token = token;
  }
  getAlreadyToken() {
    return this.token;
  }

  getQuery(uri: string) {
    const HEADERS = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.get(constantes.URI + `${uri}`, { headers: HEADERS })
  }

  getNewReleases() {

    return this.getQuery('browse/new-releases?country=CO&offset=0&limit=9')
      .pipe(map(response => {
        return response['albums'].items;
      }))

  }


  getArtistas(terminoBusqueda: string) {

    return this.getQuery(`search?query=${terminoBusqueda}&type=artist&market=CO&offset=0&limit=9`)
      .pipe(map(response => {
        return response['artists'].items;
      }))
  }


  getArtista(id: string) {

    return this.getQuery(`artists/${id}`);
  }

  getTopSongs(id: any) {

    return this.getQuery(`artists/${id}/top-tracks?country=us`)
      .pipe(map(response => {
        return response['tracks'];
      }));
  }

  getRelatedArtist(id: any) {
    return this.getQuery(`artists/${id}/related-artists`)
    .pipe( map (response =>{
      return this.slicePipe.transform(response['artists'],0,3);
    }))
  }

  thisisanexample(): any {

    this.http.get('http://mipronostico.ideam.gov.co/IdeamWebApp2/Ideam/getDatosAbiertos/pronosticos/ws/generador.php?lat=5.083243&long=-73.364427&dato=txt&tipo=prono', { responseType: 'text' })
      .subscribe((response: string) => {

        this.papa.parse(response, {
          complete: (result) => {

          }
        });

      });
  }


}
