import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GolruangComponent } from './golruang.component';

describe('GolruangComponent', () => {
  let component: GolruangComponent;
  let fixture: ComponentFixture<GolruangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GolruangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GolruangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
