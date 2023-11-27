import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {GalleryDescriptionTypes} from './index';

@Injectable({
  providedIn: 'root'
})
export class GalleryDescriptionService {
  constructor(private http: HttpClient) {
  }

  public getById(id: string): Observable<GalleryDescriptionTypes.ImageDescription> {
    return this.http.get<GalleryDescriptionTypes.ImageDescription>('http://localhost:5291/image-description');
  }

  public getAll(): Observable<GalleryDescriptionTypes.ImageDescription[]> {
    return this.http.get<GalleryDescriptionTypes.ImageDescription[]>('http://localhost:5291/image-description');
  }

  public post(body: GalleryDescriptionTypes.PostRequestBody): Observable<GalleryDescriptionTypes.ImageDescription> {
    return this.http.post<GalleryDescriptionTypes.ImageDescription>('http://localhost:5291/image-description', body)
  }

  public delete(id: string): Observable<string> {
    return this.http.delete<string>(`http://localhost:5291/image-description/${id}`)
  }


}
