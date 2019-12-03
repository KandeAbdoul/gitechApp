import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from './../database.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sujet',
  templateUrl: './sujet.page.html',
  styleUrls: ['./sujet.page.scss'],
})
export class SujetPage implements OnInit {
  idSujet;
  comments;
  sujet;
  commentaire = '';
  idPersonne;
  constructor(private data: DatabaseService, private route: ActivatedRoute) {
    this.route.paramMap.subscribe((params) =>{
      this.idSujet = params.get('id');
      console.log(this.idSujet);
    });
   }

  ngOnInit() {
    this.data.getSujetById(this.idSujet)
    .then((data) =>{
      this.sujet = data;
      console.log(this.sujet);
    })
    .catch((e) =>{
      console.error(e);
    });
    this.data.getCommentForSubject(this.idSujet)
    .then((data) =>{
      this.comments = data;
      console.log('les commentaires : ' + JSON.stringify(this.comments));
    })
    .catch((e) =>{
      console.error(e);
    });

    this.data.getStudent()
    .then((student) =>{
      this.idPersonne = student[0].matricule;
      console.log('idPersonne = ' + this.idPersonne);
    })
    .catch((e) =>{
      console.log(e);
    });
  }

  insertCommentaire(){
    this.data.insertComment(this.idSujet,this.idPersonne, this.commentaire);
    this.commentaire = '';
    this.data.getCommentForSubject(this.idSujet)
    .then((data) =>{
      this.comments = data;
    })
    .catch((e) =>{
      console.error(e);
    });
  }

}
