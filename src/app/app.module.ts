import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MomentModule } from 'ngx-moment';
import { NgScrollbarModule } from 'ngx-scrollbar';

import { ArticleComponent } from './article/article.component';
import { DossierComponent } from './dossier/dossier.component';
import { FictionariumComponent, ModalComponentDialog } from './fictionarium/fictionarium.component';
import { AudioEffectsClick, AudioEffectsHover } from './_lib/audio.effects';
import { Globals } from './_lib/globals';
import { InfocastComponent } from './infocast/infocast.component';
import { JsonService } from './_lib/service.json';
import { NavComponent } from './nav/nav.component';
import { Paginator } from './_lib/paginator';
import { PlexusComponent } from './plexus/plexus.component';
import { TransferService } from './_lib/service.transfer';

@NgModule({
  declarations: [
    AppComponent,
    AudioEffectsClick,
    AudioEffectsHover,
    ArticleComponent,
    DossierComponent,
    FictionariumComponent,
    InfocastComponent,
    ModalComponentDialog,
    NavComponent,
    Paginator,
    PlexusComponent
  ],
  entryComponents: [
    ModalComponentDialog
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FlexLayoutModule,
    HttpClientModule,
    MatDialogModule,
    MomentModule,
    NgScrollbarModule,
    RouterModule
  ],
  providers: [ Globals, JsonService, TransferService ],
  bootstrap: [AppComponent]
})
export class AppModule {}
