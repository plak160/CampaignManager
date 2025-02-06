import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCampainComponent } from './create-campain.component';

describe('CreateCampainComponent', () => {
  let component: CreateCampainComponent;
  let fixture: ComponentFixture<CreateCampainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCampainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCampainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
