import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckDialogViewCardsComponent } from './deck-dialog-view-cards.component';

describe('DeckDialogViewCardsComponent', () => {
  let component: DeckDialogViewCardsComponent;
  let fixture: ComponentFixture<DeckDialogViewCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeckDialogViewCardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeckDialogViewCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
