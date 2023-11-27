import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {GalleryTypes} from './index';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  constructor(private http: HttpClient) {
  }

  public getImages(): Observable<GalleryTypes.ImageContainer[]> {
    return this.http.get<GalleryTypes.ImageContainer[]>('http://localhost:5291/images');
  }

  public getImage(imageName: string): Observable<GalleryTypes.ImageContainer> {
    return this.http.get<GalleryTypes.ImageContainer>(`http://localhost:5291/images/${imageName}`)
  }

  public postImage(files: FileList): Observable<GalleryTypes.ImageContainer[]> {
    const formData = new FormData();

    for(let i = 0; i < files.length; i++) {
      formData.append(`images`, files[i], files[i].name);
    }
    return this.http.post<GalleryTypes.ImageContainer[]>('http://localhost:5291/images', formData)
  }

  public deleteImage(filename: string) {
    return this.http.delete(`http://localhost:5291/images/${filename}`)
  }
}
