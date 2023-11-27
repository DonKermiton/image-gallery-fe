import {Component, DestroyRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {GalleryService} from "../../services/gallery/gallery.service";
import {GalleryTypes} from './../../services/gallery/index'
import {FormsModule} from "@angular/forms";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {AddImageComponent} from "../add-image/add-image.component";
import {MatStepper} from "@angular/material/stepper";




@Component({
  selector: 'app-add-image-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule, FormsModule, AddImageComponent],
  templateUrl: './add-image-dialog.component.html',
  styleUrls: ['./add-image-dialog.component.scss']
})
export class AddImageDialogComponent {
  private savedImages: FileList | null = null


  constructor(public dialogRef: MatDialogRef<AddImageDialogComponent, GalleryTypes.ImageContainer[]>,
              private galleryService: GalleryService,
              private destroyRef: DestroyRef) {
  }

  public publishImage() {
    if(this.savedImages) {
      this.galleryService.postImage(this.savedImages)
        .pipe(
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe((images: GalleryTypes.ImageContainer[]) => {
          this.dialogRef.close(images);
        });
    }
  }

  add(): void {
    this.publishImage()
  }

  cancel(): void {
    this.dialogRef.close();
  }


  updateImages($event: FileList) {
    this.savedImages = $event;
  }
}
