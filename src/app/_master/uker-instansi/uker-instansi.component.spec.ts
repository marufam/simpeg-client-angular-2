import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UkerInstansiComponent } from './uker-instansi.component';

describe('UkerInstansiComponent', () => {
  let component: UkerInstansiComponent;
  let fixture: ComponentFixture<UkerInstansiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UkerInstansiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UkerInstansiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
