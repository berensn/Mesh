
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';

import { ArticleComponent } from './article/article.component';
import { DossierComponent } from './dossier/dossier.component';
import { FictionariumComponent, ModalComponentDialog } from './fictionarium/fictionarium.component';
import { Globals } from './helpers/globals';
import { InfocastComponent } from './infocast/infocast.component';
import { JsonService } from './helpers/json.service';
import { Paginator } from './helpers/paginator';
import { PlexusComponent } from './plexus/plexus.component';
import * as PIXI from 'pixi.js';
import { TransferService } from './helpers/transfer.service';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    DossierComponent,
    FictionariumComponent,
    InfocastComponent,    
    ModalComponentDialog,
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
    HttpClientModule,
    MatDialogModule
  ],
  providers: [ Globals, JsonService, TransferService],
  bootstrap: [AppComponent]
})
export class AppModule {}