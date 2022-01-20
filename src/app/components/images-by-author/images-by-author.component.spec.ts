import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesByAuthorComponent } from './images-by-author.component';

describe('ImagesByAuthorComponent', () => {
  let component: ImagesByAuthorComponent;
  let fixture: ComponentFixture<ImagesByAuthorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagesByAuthorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagesByAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
