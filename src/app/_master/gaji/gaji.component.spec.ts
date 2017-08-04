import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GajiComponent } from './gaji.component';

describe('GajiComponent', () => {
  let component: GajiComponent;
  let fixture: ComponentFixture<GajiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GajiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GajiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
