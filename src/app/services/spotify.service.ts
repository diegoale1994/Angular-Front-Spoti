import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Papa } from 'ngx-papaparse';
import { map } from 'rxjs/operators';
import { URI } from "./../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  tiempo:any[] = [];
  codigoAutoizacion:string="";
  constructor(private http: HttpClient, private papa: Papa) { 

  }

  getQuery(uri:string){
      const HEADERS = new HttpHeaders({
        'Authorization': 'Bearer BQDu7o6cO9cjbtJULZFW85MFJvK0XuyzhPZURC-5PtRGo96yQ-C9CeX-HZ-RbANghAL_hHHq2wnElQbLzBY'
    });

      return this.http.get(URI+`${uri}`,{headers: HEADERS})
  }

  getNewReleases(){
   
    return this.getQuery('browse/new-releases?country=CO&offset=0&limit=10')
    .pipe( map( response=>{
      return response['albums'].items;
    } ) )
    
  }


  getArtistas(terminoBusqueda:string){

  return this.getQuery(`search?query=${terminoBusqueda}&type=artist&market=CO&offset=0&limit=10`)
  .pipe( map(response =>{
      return response['artists'].items;
  }) )
  }


  getArtista(id:string){

    return this.getQuery(`artists/${id}`);
    }

    getTopSongs(id:any){

      return this.getQuery(`artists/${id}/top-tracks?country=us`)
      .pipe( map(response => {
        return response['tracks'];
      }) );
      }

  thisisanexample():any{

    this.http.get('http://mipronostico.ideam.gov.co/IdeamWebApp2/Ideam/getDatosAbiertos/pronosticos/ws/generador.php?lat=5.083243&long=-73.364427&dato=txt&tipo=prono',{responseType: 'text'})
    .subscribe( (response:string) => {
        
      this.papa.parse(response,{
        complete: (result) => {
         
        }
    });

      });
  }


}
