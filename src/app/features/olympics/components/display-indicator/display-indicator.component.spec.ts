import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayIndicatorComponent } from './display-indicator.component';

describe('DisplayIndicatorComponent', () => {
  let component: DisplayIndicatorComponent;
  let fixture: ComponentFixture<DisplayIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayIndicatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
