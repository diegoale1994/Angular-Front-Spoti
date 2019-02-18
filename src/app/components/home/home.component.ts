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
  token:boolean;
  constructor(private spotifyService: SpotifyService) {
    this.loading = true;
    if(this.spotifyService.getAlreadyToken()=== undefined){
      this.spotifyService.getToken().subscribe((response:any) =>{
        this.spotifyService.setToken(response.access_token);
        this.spotifyService.getNewReleases()
        .subscribe((response:any) => {
          this.newSongs = response;
          this.loading = false;
        },(error)=>{
          if (error.error.error.message=="Invalid access token"){
            this.spotifyService.getToken().subscribe((response:any) => {
              this.spotifyService.setToken(response.access_token);
            })
  
          }
        })
      })

    }else{
      this.spotifyService.getNewReleases()
        .subscribe((response:any) => {
          this.newSongs = response;
          this.loading = false;
        })
    }
   }

  ngOnInit() {

  }
 
}
