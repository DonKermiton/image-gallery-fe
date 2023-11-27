import {Injectable} from "@angular/core";
import {GalleryTypes} from '../../services/gallery'
import {Subject} from "rxjs";
import {GalleryService} from "../../services/gallery/gallery.service";

@Injectable({
  providedIn: 'root'
})
export class ImageGalleryRefreshService {
  public readonly refresh$: Subject<{ type: 'add' | 'remove', image: GalleryTypes.ImageContainer | GalleryTypes.ImageContainer[] }> = new Subject<{
    type: 'add' | 'remove',
    image: GalleryTypes.ImageContainer | GalleryTypes.ImageContainer[]
  }>();


  public add(image: GalleryTypes.ImageContainer[]): void {
    this.refresh$.next({
      type: 'add',
      image
    });
  }

  public remove(image: GalleryTypes.ImageContainer): void {
    this.refresh$.next({
      type: 'remove',
      image,
    })
  }

}
