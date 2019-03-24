import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalitycsComponent } from './analitycs.component';

describe('AnalitycsComponent', () => {
  let component: AnalitycsComponent;
  let fixture: ComponentFixture<AnalitycsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalitycsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalitycsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
