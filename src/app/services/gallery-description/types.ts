import {GalleryTypes} from './../gallery/index';

export interface ImageDescription {
  images: GalleryTypes.ImageContainer[];
  id: string;
  imageIds: string[];
  collection: string
  title: string;
  description: string;
  created: Date;
}

export interface DeleteImageRequestBody {
  id: string;
  collection?: string;
}

export interface PostRequestBody {
  imageIds: string[];
  title: string;
  description: string;
  collection: string;
}
