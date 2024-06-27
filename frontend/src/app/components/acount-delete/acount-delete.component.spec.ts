import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcountDeleteComponent } from './acount-delete.component';

describe('AcountDeleteComponent', () => {
  let component: AcountDeleteComponent;
  let fixture: ComponentFixture<AcountDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AcountDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcountDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
