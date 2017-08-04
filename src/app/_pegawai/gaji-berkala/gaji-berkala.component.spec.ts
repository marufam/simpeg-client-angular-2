import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GajiBerkalaComponent } from './gaji-berkala.component';

describe('GajiBerkalaComponent', () => {
  let component: GajiBerkalaComponent;
  let fixture: ComponentFixture<GajiBerkalaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GajiBerkalaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GajiBerkalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
