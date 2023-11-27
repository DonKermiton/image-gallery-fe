import {ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {GalleryDescriptionTypes} from '../../../services/gallery-description/index';
import {ConfirmDialogComponent} from "../../../share/confirm-dialog/confirm-dialog.component";
import {EMPTY, iif, mergeMap} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MatDialog} from "@angular/material/dialog";
import {PostRefreshService} from "../post-refresh.service";
import {GalleryDescriptionService} from "../../../services/gallery-description/gallery-description.service";

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostComponent {
  @Input({required: true})
  public post!: GalleryDescriptionTypes.ImageDescription;
  public currentIndex: number = 0;


  constructor(private dialog: MatDialog,
              private destroyRef: DestroyRef,
              private postRefreshService: PostRefreshService,
              private galleryDescriptionService: GalleryDescriptionService,
              private cdRef: ChangeDetectorRef) {
  }

  public delete(): void {
    this.dialog.open(ConfirmDialogComponent, {
    }).afterClosed()
      .pipe(
        mergeMap(accepted => iif(() => accepted, this.galleryDescriptionService.delete(this.post.id), EMPTY)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((res) => this.postRefreshService.remove(this.post))
  }

  sliderTo(number: number) {
    const length = this.post.images.length;
    this.currentIndex = (this.currentIndex + number + length) % length;
    this.cdRef.detectChanges();
  }
}
