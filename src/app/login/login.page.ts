import { Routes, Router } from '@angular/router';
import { AuthenticationService } from './../authentification.service';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  form = {
    identifiant: '',
    password: ''
  };

  constructor(private route: Router, private alertController: AlertController, private authService: AuthenticationService) { }

  ngOnInit() {
  }
  
  login(){
   this.authService.login(this.form);
  }
}
