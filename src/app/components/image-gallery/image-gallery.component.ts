import {Component, DestroyRef, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {GalleryService} from "../../services/gallery/gallery.service";
import {ImagePreviewComponent} from "./image-preview/image-preview.component";
import {GalleryTypes} from './../../services/gallery/index'
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MatButtonModule} from "@angular/material/button";
import {ImageGalleryRefreshService} from "../image-gallery-refresh.service";
import {switchMap, tap} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {AddImageComponent} from "../../share/add-image/add-image.component";

@Component({
  selector: 'app-image-gallery',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, ImagePreviewComponent, MatButtonModule],
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss']
})
export class ImageGalleryComponent implements OnInit {
  public images: GalleryTypes.ImageContainer[] = [];

  constructor(private galleryService: GalleryService, private destroyRef: DestroyRef, private imageRefreshGallery: ImageGalleryRefreshService, private dialog: MatDialog) {

  }

  public ngOnInit() {

    this.galleryService.getImages()
      .pipe(tap(images => {
        this.images = images;
      }), switchMap(() => this.imageRefreshGallery.refresh$), takeUntilDestroyed(this.destroyRef),)
      .subscribe((images) => {
        if (images.type === 'remove') {
          this.images = this.images.filter(image => image.filename !== (images.image as GalleryTypes.ImageContainer).filename)
        } else if (images.type === 'add') {
          if (Array.isArray(images.image)) {
            this.images.unshift(images.image[0]);
          }
        }
      });
  }

  public addImage(): void {
    this.dialog.open(AddImageComponent, {}).afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: GalleryTypes.ImageContainer[] | null) => {
        if (res) {
          this.imageRefreshGallery.add(res)
        }
      })
  }
}
