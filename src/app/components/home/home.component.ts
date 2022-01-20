import { Component, OnInit } from '@angular/core';
import { GalleryService } from "../../services/gallery.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public images: any[] = []

  constructor(
    private gallery: GalleryService,
    private http: HttpClient
  ) { }

  public async ngOnInit(): Promise<void> {
    const images = await this.gallery.getAllImages()
    this.images = await Promise.all(images.map(async (image) => {
      const metaData: any = await this.http.get(image.imageMetaDataUrl).toPromise()
      return {
        title: image.title,
        image: metaData.fileUrl,
        description: metaData.description
      }
    }))
  }
}
