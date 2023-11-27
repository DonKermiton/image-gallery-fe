import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsGalleryComponent } from './posts-gallery.component';

describe('PostsGalleryComponent', () => {
  let component: PostsGalleryComponent;
  let fixture: ComponentFixture<PostsGalleryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PostsGalleryComponent]
    });
    fixture = TestBed.createComponent(PostsGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
