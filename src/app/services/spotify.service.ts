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
        'Authorization': 'Bearer BQCn1bS57g3AhWmwH--QOENCkgmY5mkj52_swit5rAJ7yLFjX0Zp9j8RrMbv3R-MhXULKrjNm-xf-anZLHE'
    });

      return this.http.get(URI+`${uri}`,{headers: HEADERS})
  }

  getNewReleases(){
   
    return this.getQuery('browse/new-releases?country=CO&offset=5&limit=10')
    .pipe( map( response=>{
      return response['albums'].items;
    } ) )
    
  }


  getArtista(terminoBusqueda:string){

  return this.getQuery(`search?query=${terminoBusqueda}&type=artist&offset=1&limit=5`)
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
