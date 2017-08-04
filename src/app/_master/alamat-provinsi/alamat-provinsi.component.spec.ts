import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlamatProvinsiComponent } from './alamat-provinsi.component';

describe('AlamatProvinsiComponent', () => {
  let component: AlamatProvinsiComponent;
  let fixture: ComponentFixture<AlamatProvinsiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlamatProvinsiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlamatProvinsiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
