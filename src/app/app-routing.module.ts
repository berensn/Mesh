import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DossierComponent } from './dossier/dossier.component';
import { FictionariumComponent } from './fictionarium/fictionarium.component';
import { ArticleComponent } from './article/article.component';
import { InfocastComponent } from './infocast/infocast.component';
import { PlexusComponent } from './plexus/plexus.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/article', pathMatch: 'full'
  },
  {
    path: 'article',
    component: ArticleComponent
  },
  {
    path: 'fictionarium',
    component: FictionariumComponent
  },
  {
    path: 'dossier',
    component: DossierComponent
  },
  {
    path: 'infocast',
    component: InfocastComponent
  },
  {
    path: 'plexus',
    component: PlexusComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
