import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MomentModule } from 'ngx-moment';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

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

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

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
    Paginator,
    PlexusComponent, NavComponent
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
    PerfectScrollbarModule,
    RouterModule
  ],
  providers: [ Globals, JsonService, TransferService, { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG } ],
  bootstrap: [AppComponent]
})
export class AppModule {}