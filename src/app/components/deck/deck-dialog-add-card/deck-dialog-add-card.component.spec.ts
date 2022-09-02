import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckDialogAddCardComponent } from './deck-dialog-add-card.component';

describe('DeckDialogAddCardComponent', () => {
  let component: DeckDialogAddCardComponent;
  let fixture: ComponentFixture<DeckDialogAddCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeckDialogAddCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeckDialogAddCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
