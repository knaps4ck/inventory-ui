import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddinventoryComponent } from './addinventory.component';

describe('AddinventoryComponent', () => {
  let component: AddinventoryComponent;
  let fixture: ComponentFixture<AddinventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddinventoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddinventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
