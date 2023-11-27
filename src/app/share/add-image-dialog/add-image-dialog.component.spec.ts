import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddImageDialogComponent } from './add-image-dialog.component';

describe('AddImageComponent', () => {
  let component: AddImageDialogComponent;
  let fixture: ComponentFixture<AddImageDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddImageDialogComponent]
    });
    fixture = TestBed.createComponent(AddImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
