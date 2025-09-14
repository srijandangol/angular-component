import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEg } from './form-eg';

describe('FormEg', () => {
  let component: FormEg;
  let fixture: ComponentFixture<FormEg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormEg]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormEg);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
