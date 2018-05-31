import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfocastComponent } from './infocast.component';

describe('InfocastComponent', () => {
  let component: InfocastComponent;
  let fixture: ComponentFixture<InfocastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfocastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfocastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
