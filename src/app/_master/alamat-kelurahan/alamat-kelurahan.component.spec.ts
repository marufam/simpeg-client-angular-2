import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlamatKelurahanComponent } from './alamat-kelurahan.component';

describe('AlamatKelurahanComponent', () => {
  let component: AlamatKelurahanComponent;
  let fixture: ComponentFixture<AlamatKelurahanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlamatKelurahanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlamatKelurahanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
