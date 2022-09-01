import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckDialogAddComponent } from './deck-dialog-add.component';

describe('DeckDialogAddComponent', () => {
  let component: DeckDialogAddComponent;
  let fixture: ComponentFixture<DeckDialogAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeckDialogAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeckDialogAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
