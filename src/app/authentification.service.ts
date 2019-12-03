import { Router } from '@angular/router';
import { Platform, AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
 
const TOKEN_KEY = 'auth-token';
 
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
 
  authenticationState = new BehaviorSubject(false);
  
  private username = 'admin';
  private password = 'admin';
  isAuthenticate = false;

  constructor(private storage: Storage, private plt: Platform, private route: Router, private alertController: AlertController) { 
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Erreur de connexion',
      message: 'vérifier votre username ou votre mot de passe',
      buttons: ['OK']
    });

    await alert.present();
  }
 
  checkToken() {
    this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        console.log(res);
        this.authenticationState.next(true);
      }
    })
  }
 
  login(form) {
    if((form.identifiant == this.username) && (form.password == this.password)){
      this.isAuthenticate = true;
      this.route.navigate(['../profil']);
    } else{
      this.presentAlert();
    }
    // return this.storage.set(TOKEN_KEY, 'Bearer 1234567').then(() => {
    //   this.authenticationState.next(true);
    // });
    // console.log(this.storage.get(TOKEN_KEY));

  }
 
  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }
 
  isAuthenticated() {
    return this.authenticationState.value;
  }
 
}