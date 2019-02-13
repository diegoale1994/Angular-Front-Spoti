import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Papa } from 'ngx-papaparse';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  tiempo:any[] = [];
  constructor(private http: HttpClient, private papa: Papa) { 
  }

  getQuery(uri:string){
      const URL = `https://api.spotify.com/v1/${uri}`;

      const HEADERS = new HttpHeaders({
        'Authorization': 'Bearer BQCS4RS0a-diBbMcNIsy3_tZ9xTogarHCTwLHv1OY50wCEdjOmpSPxpV9vPFUDF5O3L5uz08A0zOo9yW04k'
    });

      return this.http.get(URL,{headers: HEADERS})
  }

  getNewReleases(){
   
    return this.getQuery('browse/new-releases?country=CO&offset=5&limit=10')
    .pipe( map( response=>{
      return response['albums'].items;
    } ) )
    
  }


  getArtista(terminoBusqueda:string){

  return this.getQuery(`search?query=${terminoBusqueda}&type=artist&market=CO&offset=1&limit=5`)
  .pipe( map(response =>{
      return response['artists'].items;
  }) )
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
