import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GolruangRuangComponent } from './golruang-ruang.component';

describe('GolruangRuangComponent', () => {
  let component: GolruangRuangComponent;
  let fixture: ComponentFixture<GolruangRuangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GolruangRuangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GolruangRuangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
