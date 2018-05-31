import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FictionariumComponent } from './fictionarium.component';

describe('FictionariumComponent', () => {
  let component: FictionariumComponent;
  let fixture: ComponentFixture<FictionariumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FictionariumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FictionariumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
