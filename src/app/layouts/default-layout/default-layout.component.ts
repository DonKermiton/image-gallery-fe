import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {GalleryService} from "../../services/gallery/gallery.service";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-default-layout',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule, RouterOutlet],
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent {
  constructor() {
  }

}
