import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaceTravailComponent } from './espace-travail.component';

describe('EspaceTravailComponent', () => {
  let component: EspaceTravailComponent;
  let fixture: ComponentFixture<EspaceTravailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspaceTravailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspaceTravailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
