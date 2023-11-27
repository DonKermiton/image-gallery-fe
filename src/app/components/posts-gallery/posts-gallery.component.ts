import {ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PostComponent} from "./post/post.component";
import {GalleryDescriptionService} from "../../services/gallery-description/gallery-description.service";
import {GalleryDescriptionTypes} from './../../services/gallery-description/index';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MatButtonModule} from "@angular/material/button";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {AddPostComponent} from "../../share/add-post/add-post.component";
import {EMPTY, iif, mergeMap, switchMap} from "rxjs";
import {PostRefreshService} from "./post-refresh.service";
import {ConfirmDialogComponent} from "../../share/confirm-dialog/confirm-dialog.component";


@Component({
  selector: 'app-posts-gallery',
  standalone: true,
  imports: [CommonModule, PostComponent, MatButtonModule, MatDialogModule],
  templateUrl: './posts-gallery.component.html',
  styleUrls: ['./posts-gallery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsGalleryComponent implements OnInit {
  public posts: GalleryDescriptionTypes.ImageDescription[] = [];

  constructor(private galleryDescriptionService: GalleryDescriptionService,
              private cdRef: ChangeDetectorRef,
              private destroyRef: DestroyRef,
              private postRefreshService: PostRefreshService,
              private dialog: MatDialog) {
  }

  public ngOnInit() {
    this.galleryDescriptionService.getAll()
      .pipe(
        switchMap((posts) => {
          this.posts = posts;
          this.cdRef.detectChanges();
          return this.postRefreshService.refresh$}),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((post) => {
        if(post.type === 'add') {
          this.posts.unshift(post.post)
        } else if(post.type === 'remove') {
          this.posts = this.posts.filter(e => e.id !== post.post.id)
        }
        this.cdRef.detectChanges();
      })
  }

  addPost() {
    this.dialog.open(AddPostComponent, {}).afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((type: GalleryDescriptionTypes.ImageDescription | null) => {
        if(type) {
          this.postRefreshService.add(type)
        }
      })
  }
}
