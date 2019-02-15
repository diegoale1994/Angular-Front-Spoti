import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from './../../services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: []
})
export class ArtistaComponent{
artista:any = {};
loading:boolean;
topSongs:any[] = [];
  constructor(private router:ActivatedRoute, private spotifyService: SpotifyService) { 

    this.router.params.subscribe(params =>{
      this.loading=true;
      this.getArtista(params['id']);
      this.getTopSongs(params['id']);
    })

  }

  getArtista(artista:any){
   
    this.spotifyService.getArtista(artista).subscribe(response => {
      this.artista = response;
      this.loading=false;
    })
  }

  getTopSongs(id:any){
    this.spotifyService.getTopSongs(id).subscribe(response => {
      this.topSongs= response;
    })
  }

}
