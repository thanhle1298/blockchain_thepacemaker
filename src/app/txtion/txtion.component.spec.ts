import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TxtionComponent } from './txtion.component';

describe('TxtionComponent', () => {
  let component: TxtionComponent;
  let fixture: ComponentFixture<TxtionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TxtionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TxtionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
