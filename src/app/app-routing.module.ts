import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DefaultLayoutComponent} from "./layouts/default-layout/default-layout.component";
import {ImageGalleryComponent} from "./components/image-gallery/image-gallery.component";
import {PostsGalleryComponent} from "./components/posts-gallery/posts-gallery.component";
import {EditPostComponent} from "./components/edit-post/edit-post.component";

const routes: Routes = [{
  path: '', component: DefaultLayoutComponent, children: [
    {
      path: '',
      component: PostsGalleryComponent
    },
    {
      path: 'edit/:id',
      component: EditPostComponent
    },
    {
      path: 'gallery',
      component: ImageGalleryComponent
    },
  ],
}, {
  path: '**',
  redirectTo: '',
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
