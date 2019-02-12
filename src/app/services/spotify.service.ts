import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) { 
   
  }

  getNewReleases(){
    const HEADERS = new HttpHeaders({
        'Authorization': 'Bearer BQDrzZM_dKkztHkLegQCUIHjvUzT-4Tj4ENdzCOG_YmPtI_IRXBRHdQxhfvuNh_HE8k8abQSR30qhfKjHPo'
    });
    this.http.get('https://api.spotify.com/v1/browse/new-releases?country=CO&offset=5&limit=10', {headers: HEADERS})
    .subscribe( response => {
        console.log(response);
      });
  }
}
