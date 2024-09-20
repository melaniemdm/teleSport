import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipationMedalsGraphComponent } from './participation-medals-graph.component';

describe('ParticipationMedalsGraphComponent', () => {
  let component: ParticipationMedalsGraphComponent;
  let fixture: ComponentFixture<ParticipationMedalsGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParticipationMedalsGraphComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParticipationMedalsGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
