import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LookForMatchComponent } from './look-for-match.component';

describe('LookForMatchComponent', () => {
  let component: LookForMatchComponent;
  let fixture: ComponentFixture<LookForMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LookForMatchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LookForMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
