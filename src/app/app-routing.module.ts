import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DefaultLayoutComponent} from "./layouts/default-layout/default-layout.component";
import {ImageGalleryComponent} from "./components/image-gallery/image-gallery.component";

const routes: Routes = [{
  path: '', pathMatch: "full", component: DefaultLayoutComponent, children: [
    {
      path: '',
      pathMatch: 'full',
      component: ImageGalleryComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
