import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from './../database.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-create-forum',
  templateUrl: './create-forum.page.html',
  styleUrls: ['./create-forum.page.scss'],
})
export class CreateForumPage implements OnInit {
  formulaire = {
    title: '',
    content: ''
  };
  idCours;
  idPersonne;
  constructor(private data: DatabaseService, private router: Router, private route: ActivatedRoute, private navCtrl : NavController) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params) =>{
      this.idCours = params.get('id');
      console.log('identifiant du cours : ' + this.idCours);
    });

    this.data.getStudent()
    .then((student: any) =>{
      this.idPersonne = student[0].matricule;
      console.log(this.idPersonne);
    })
  }

  createSujet(){
    if(this.formulaire.title != '' && this.formulaire.content != ''){
      this.data.insertSubjectIntoForum(this.idCours, this.formulaire.title,
      this.formulaire.content, this.data.getIdForumCours(), this.idPersonne);
      this.formulaire.title = '';
      this.formulaire.content = '';
      this.router.navigate(['/forums', this.idCours]);
    }
  }

}
