import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TollBarComponent } from './toll-bar.component';

describe('TollBarComponent', () => {
  let component: TollBarComponent;
  let fixture: ComponentFixture<TollBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TollBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TollBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
