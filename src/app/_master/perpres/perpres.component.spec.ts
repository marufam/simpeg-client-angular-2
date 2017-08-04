import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerpresComponent } from './perpres.component';

describe('PerpresComponent', () => {
  let component: PerpresComponent;
  let fixture: ComponentFixture<PerpresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerpresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerpresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
