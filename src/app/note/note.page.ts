import { Platform } from '@ionic/angular';
import { DatabaseService } from './../database.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-note',
  templateUrl: './note.page.html',
  styleUrls: ['./note.page.scss'],
})
export class NotePage implements OnInit {

  constructor(private data: DatabaseService, private plt: Platform) {  }
  notes: any;
  controles: any;
  courses: any;
  schoolYears: any;
  semestres: any;
  defaultYear = '2017 - 2018';
  defaultSemestre = '1er Trimestre';
  semestre = [2, '1er Trimestre', '2017 - 2018'];
  ngOnInit() {
    this.plt.ready()
    .then(() =>{
      this.data.getNotes()
      .then((data) =>{
        this.notes = data;
        console.log(this.notes);
      })
      .catch((e) =>{
        console.log(e);
      });
      this.data.getCours()
      .then((controle: any) =>{
        this.courses = controle;
      })
      .catch((e) =>{
        console.log(e);
      });
    });
    this.getSemestre();
    this.getYears();
  }

  getControles(){
    this.data.getControle()
    .then((data) =>{
      console.log(data);
    });
  }


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
    } else{
      type = 'Semestre';
      param = [event.target.value.idSemestre, event.target.value.semestre, this.data.currentYear];
      this.data.currentSemestre = event.target.value.semestre;
      this.semestre[0] = event.target.value.idSemestre;
    }
    this.data.getCoursBySemester(param, type)
    .then((data) => {
      if(data != null){
       this.courses = data;
      }
      else{
        this.courses = 'Pas de Cours pour défini';
      }
    }).catch((error) => {
      console.log(error);
    });
  }

}
