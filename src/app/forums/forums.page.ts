import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from './../database.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forums',
  templateUrl: './forums.page.html',
  styleUrls: ['./forums.page.scss'],
})
export class ForumsPage implements OnInit {
  forums = [];
  idCours;
  constructor(private data: DatabaseService, private route: ActivatedRoute) {
    this.route.paramMap.subscribe((params) =>{
      this.idCours = params.get('id');
    });
  }

  ngOnInit() {
    this.data.getForumsByCoursId(this.idCours)
    .then((data: any) =>{
      this.forums = data;
      console.log(this.forums);
    })
    .catch((e) =>{
      console.error(e);
    });
  }

}
