import { Platform } from '@ionic/angular';
import { DatabaseService } from './../database.service';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {
  students: any;
  constructor(private dbService: DatabaseService, private plt: Platform) {
    this.plt.ready().then(() => {
      this.dbService.insertCours();
    });
   }

  ngOnInit() {
    this.dbService.getStudent().then((data) =>{
      this.students = data;
      console.log(this.students);
    });
    // this.dbService.getTuteurs();
    // this.dbService.insertEleve();
  }

 openMenu() {
    document.querySelector('ion-menu-controller')
      .open();
  }

  insertTuteur() {
    this.dbService.insertTuteur();
  }

  getPersonnes() {
    this.dbService.getStudent().then((data) =>{
      this.students = data;
      console.log(this.students);
    });
  }

  insertEleve() {
    this.dbService.insertEleve();
  }

  insertProfesseur() {
    this.dbService.insertProf();
  }

  insertCours(){
    this.dbService.insertCours();
  }

  loadData(){
    this.dbService.loadData();
  }
}
