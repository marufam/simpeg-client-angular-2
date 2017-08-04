import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GolruangGolonganComponent } from './golruang-golongan.component';

describe('GolruangGolonganComponent', () => {
  let component: GolruangGolonganComponent;
  let fixture: ComponentFixture<GolruangGolonganComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GolruangGolonganComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GolruangGolonganComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
