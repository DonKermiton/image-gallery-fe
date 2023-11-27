import {Component, DestroyRef, Input, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {GalleryTypes} from '../../../services/gallery/index';
import {MatIconModule} from "@angular/material/icon";
import {GalleryService} from "../../../services/gallery/gallery.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../../share/confirm-dialog/confirm-dialog.component";
import {EMPTY, iif, mergeMap} from "rxjs";
import {ImageGalleryRefreshService} from "../image-gallery-refresh.service";

@Component({
  selector: 'app-image-preview',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, MatIconModule, MatDialogModule],
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.scss']
})
export class ImagePreviewComponent {
  @Input({required: true})
  public image!: GalleryTypes.ImageContainer;

  constructor(private galleryService: GalleryService, private destroyRef: DestroyRef, private dialog: MatDialog,
              private imageRefreshGallery: ImageGalleryRefreshService) {
  }

  public deleteImage() {

    this.dialog.open(ConfirmDialogComponent, {
    }).afterClosed()
      .pipe(
        mergeMap(accepted => iif(() => accepted, this.galleryService.deleteImage(this.image.filename), EMPTY)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((res) => this.imageRefreshGallery.remove(this.image))
  }
}
