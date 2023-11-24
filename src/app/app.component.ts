import { Component } from '@angular/core';
import {GalleryService} from "./services/gallery/gallery.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'image-gallery-fe';
  constructor() {

  }
}
