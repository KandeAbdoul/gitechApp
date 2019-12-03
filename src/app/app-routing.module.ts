import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'profil', loadChildren: './profil/profil.module#ProfilPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'cours', loadChildren: './cours/cours.module#CoursPageModule' },
  { path: 'dossier-financier', loadChildren: './dossier-financier/dossier-financier.module#DossierFinancierPageModule' },
  { path: 'config', loadChildren: './config/config.module#ConfigPageModule' },
  { path: 'note', loadChildren: './note/note.module#NotePageModule' },
  { path: 'forums', loadChildren: './forums/forums.module#ForumsPageModule' },
  { path: 'forums/:id', loadChildren: './forums/forums.module#ForumsPageModule' },
  { path: 'sujet', loadChildren: './sujet/sujet.module#SujetPageModule' },
  { path: 'sujet/:id', loadChildren: './sujet/sujet.module#SujetPageModule' },
  { path: 'create-forum', loadChildren: './create-forum/create-forum.module#CreateForumPageModule' },
  { path: 'create-forum/:id', loadChildren: './create-forum/create-forum.module#CreateForumPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
