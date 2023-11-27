import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {GalleryDescriptionTypes} from '../../services/gallery-description/index'

@Injectable({
  providedIn: 'root'
})
export class PostRefreshService {
  public readonly refresh$: Subject<{
    type: 'add' | 'remove',
    post: GalleryDescriptionTypes.ImageDescription
  }> = new Subject<{
    type: 'add' | 'remove',
    post: GalleryDescriptionTypes.ImageDescription
  }>();


  public add(post: GalleryDescriptionTypes.ImageDescription): void {
    this.refresh$.next({
      type: 'add',
      post
    });
  }

  public remove(post: GalleryDescriptionTypes.ImageDescription): void {
    this.refresh$.next({
      type: 'remove',
      post,
    })
  }
}
