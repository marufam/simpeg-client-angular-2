import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlamatKotaComponent } from './alamat-kota.component';

describe('AlamatKotaComponent', () => {
  let component: AlamatKotaComponent;
  let fixture: ComponentFixture<AlamatKotaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlamatKotaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlamatKotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
