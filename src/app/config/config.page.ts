import { Platform } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
})
export class ConfigPage implements OnInit {

  students: any;
  constructor(private dbService: DatabaseService, private plt: Platform) {
    // this.plt.ready().then(() => {
    //   this.dbService.insertCours();
    // });
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

  insertNote(){
    this.dbService.insertNotes();
  }

  insertSujet(){
    this.dbService.getForums()
    .then((data) =>{
      console.log(data);
    });
  }

  getNote(){
    this.dbService.getNotes()
    .then((data) =>{
      console.log(data);
    });

  }

  insertIntoDoc(){
    this.dbService.insertIntoDocFin();
  }

  loadData(){
    this.dbService.loadData();
  }

  insertForum(){
    this.dbService.insertForum();
  }
}
