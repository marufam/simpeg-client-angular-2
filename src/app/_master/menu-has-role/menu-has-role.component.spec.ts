import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuHasRoleComponent } from './menu-has-role.component';

describe('MenuHasRoleComponent', () => {
  let component: MenuHasRoleComponent;
  let fixture: ComponentFixture<MenuHasRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuHasRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuHasRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
