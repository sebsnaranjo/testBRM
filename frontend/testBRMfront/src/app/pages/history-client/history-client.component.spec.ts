import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryClientComponent } from './history-client.component';

describe('HistoryClientComponent', () => {
  let component: HistoryClientComponent;
  let fixture: ComponentFixture<HistoryClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoryClientComponent]
    });
    fixture = TestBed.createComponent(HistoryClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
