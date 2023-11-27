import {Component, EventEmitter, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
interface FilePreview {
  preview: string;
  file: File;
}
@Component({
  selector: 'app-add-image',
  standalone: true,
  imports: [CommonModule],
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

  @Output()
  public imagesUpdated: EventEmitter<FileList> = new EventEmitter<FileList>();

  onFileChange($event: any) {
    const selectedImages: FileList | null = ($event.target as HTMLInputElement).files
    const files: FilePreview[] = [];

    if (selectedImages) {
      for (let i = 0; i < selectedImages.length; i++) {
        const imageURL = URL.createObjectURL(selectedImages[i]);
        files.push(<FilePreview>{preview: imageURL, file: selectedImages[i]})
      }
      this.images = files;
      this.imagesUpdated.next(selectedImages);
    }
  }
}
