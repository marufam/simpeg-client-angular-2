import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UkerComponent } from './uker.component';

describe('UkerComponent', () => {
  let component: UkerComponent;
  let fixture: ComponentFixture<UkerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UkerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
