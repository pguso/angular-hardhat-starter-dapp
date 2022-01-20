import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { ImagesByAuthorComponent } from "./components/images-by-author/images-by-author.component";
import { UploadImageComponent } from "./components/upload-image/upload-image.component";

const routes: Routes = [
  {'path': '', redirectTo: 'home', pathMatch: 'full'},
  {'path': 'home', component: HomeComponent},
  {'path': 'authors-images', component: ImagesByAuthorComponent},
  {'path': 'upload', component: UploadImageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
