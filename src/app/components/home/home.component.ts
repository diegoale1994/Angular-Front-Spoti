import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  newSongs:any[] = [];
  loading:boolean;
  constructor(private spotifyService: SpotifyService) {
    this.loading=true;
      this.spotifyService.getNewReleases()
      .subscribe((response:any) => {
        this.newSongs = response;
        
        this.loading = false;
      })
   }

  ngOnInit() {

  }
 
}
