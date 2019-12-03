import { MaterialModule } from './../material/material.module';
import { Router, NavigationExtras } from '@angular/router';
import { DatabaseService } from './../database.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cours',
  templateUrl: './cours.page.html',
  styleUrls: ['./cours.page.scss'],
})
export class CoursPage implements OnInit {
  
  rows: any;
  teacher = [];
  schoolYears: any;
  semestres: any;
  defaultYear = this.data.currentYear;
  defaultSemestre = this.data.currentSemestre;
  tableStyle = 'material';
  semestre = [2, '1er Trimestre', '2017 - 2018'];
  constructor(private router: Router, private data: DatabaseService) { 
    // this.data.insertCours();
  }

  ngOnInit() {
    this.data.getCoursBySemester(this.semestre, 'Semestre')
    .then((data) =>{
      this.rows = data;
    })
    .catch((e) =>{
      console.log('error1 ' + e);
    });
    this.getSemestre();
    this.getYears();
  }

  // getCours(year){
  //   this.data.getCoursByYears(year)
  //   .then((data) =>{
  //     this.rows = data;
  //   })
  //   .catch((e) =>{
  //     console.log('error1 ' + e);
  //   });
  // }

  getYears(){
    this.data.getSchoolYears()
    .then((years) =>{
      this.schoolYears = years;
    })
    .catch((e) => {
      console.log(e);
    });
  }

  getSemestre(){
    this.data.getSemestre()
    .then((data) =>{
      this.semestres = data;
    })
    .catch((e) =>{
      console.log(e);
    });
  }

  updateDataViewBySemester(event){
    let param: any;
    let type: string;
    if(event.target.value.length > 3) {
      type = 'Annnée Scolaire';
      this.data.currentYear = event.target.value.slice(1, 12);
      this.semestre[2] = this.data.currentYear;
      param = [this.semestre[0], this.data.currentSemestre, this.data.currentYear];
      console.log(param);
    }
    else{
      type = 'Semestre';
      param = [event.target.value.idSemestre, event.target.value.semestre, this.data.currentYear];
      this.data.currentSemestre = event.target.value.semestre;
      this.semestre[0] = event.target.value.idSemestre;
    }
    this.data.getCoursBySemester(param, type)
    .then((data) => {
      if(data != null){
       this.rows = data;
      }
      else{
        this.rows = 'Pas de Cours pour défini';
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  createForum(_id){
    const cours: NavigationExtras = {
      state: {
        id:_id
      }
    };
    console.log('je suis dans la fonction ');
    this.router.navigate(['forums'], cours);
  }


}
