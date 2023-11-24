import {Component, DestroyRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {GalleryService} from "../../services/gallery/gallery.service";
import {GalleryTypes} from './../../services/gallery/index'
import {FormsModule} from "@angular/forms";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";


interface FilePreview {
  preview: string;
  file: File;
}

@Component({
  selector: 'app-add-image',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule, FormsModule],
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.scss']
})
export class AddImageComponent {
  images: FilePreview[] = [];

  public readonly allowedMimes: string = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/bmp",
    "image/svg+xml",
    "image/webp",
    "image/tiff",
    "image/heif"
  ].join(', ')

  constructor(public dialogRef: MatDialogRef<AddImageComponent, GalleryTypes.ImageContainer[]>, private galleryService: GalleryService, private destroyRef: DestroyRef) {
  }

  public publishImage() {
    const files = this.images.slice().map(image => image.file)
    this.galleryService.postImage(files)
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((images: GalleryTypes.ImageContainer[]) => {
        this.dialogRef.close(images);
      });

  }

  add(): void {
    this.publishImage()
  }

  cancel(): void {
    this.dialogRef.close();
  }

  onFileChange($event: any) {
    const selectedImages: FileList | null = ($event.target as HTMLInputElement).files
    const files: FilePreview[] = [];


    if (selectedImages) {
      for (let i = 0; i < selectedImages.length; i++) {
         const imageURL = URL.createObjectURL(selectedImages[i]);
         files.push(<FilePreview>{preview: imageURL, file: selectedImages[i]})
      }
      this.images = files;
    }
  }
}
