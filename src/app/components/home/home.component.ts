import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  newSongs:any[] = [];
  constructor(private spotifyService: SpotifyService) {
      this.spotifyService.getNewReleases()
      .subscribe((response:any) => {
        this.newSongs = response;
      })
   }

  ngOnInit() {

  }

}
