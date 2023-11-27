import {Component, DestroyRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {GalleryService} from "../../services/gallery/gallery.service";
import {GalleryTypes} from './../../services/gallery/index'
import {MatStepperModule} from "@angular/material/stepper";
import {AddImageComponent} from "../add-image/add-image.component";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {GalleryDescriptionService} from "../../services/gallery-description/gallery-description.service";
import {GalleryDescriptionTypes} from '../../services/gallery-description/index'

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule, AddImageComponent, ReactiveFormsModule, MatInputModule, MatStepperModule],
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent {
  public images: FileList | null = null;
  public savedImages: string[] = [];
  imageInfoForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddPostComponent,GalleryDescriptionTypes.ImageDescription >,
              private galleryService: GalleryService,
              private destroyRef: DestroyRef,
              private fb: FormBuilder,
              private galleryDescriptionService: GalleryDescriptionService
              ) {
    this.imageInfoForm = this.fb.group({
      'title': new FormControl('', [Validators.required]),
      'description': new FormControl('', [Validators.required]),
      'collection': new FormControl('', [Validators.required])
    })
  }

  cancel() {
    this.dialogRef.close();
  }

  add() {
    this.galleryDescriptionService.post({
      ...this.imageInfoForm.getRawValue(),
      imageIds: this.savedImages
    }).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((e:GalleryDescriptionTypes.ImageDescription) => {
      this.dialogRef.close(e);
    })
  }

  updateImages($event: FileList) {
    this.images = $event;
  }

  publishImages() {
    if (this.images) {
      this.galleryService.postImage(this.images)
        .pipe(
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe((images: GalleryTypes.ImageContainer[]) => {
          this.savedImages = images.map(image => image.filename);
        });
    }
  }
}
