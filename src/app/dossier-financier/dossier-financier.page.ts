import { DatabaseService } from './../database.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dossier-financier',
  templateUrl: './dossier-financier.page.html',
  styleUrls: ['./dossier-financier.page.scss'],
})
export class DossierFinancierPage implements OnInit {

  dossier: any;
  constructor(private data: DatabaseService) { }

  ngOnInit() {
    this.data.getDocFin()
    .then((data) =>{
      this.dossier = data;
      console.log(this.dossier);
    })
    .catch((e) =>{
      console.log(e);
    });
  }

  showDoc(){
    this.data.getDocFin()
    .then((data) =>{
      this.dossier = data;
      console.log(this.dossier);
    })
    .catch((e) =>{
      console.log(e);
    });
  }

}
