import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMedalsGraphComponent } from './all-medals-graph.component';

describe('AllMedalsGraphComponent', () => {
  let component: AllMedalsGraphComponent;
  let fixture: ComponentFixture<AllMedalsGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllMedalsGraphComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllMedalsGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
