import { Component, OnInit } from '@angular/core';
import { GalleryService } from "../../services/gallery.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-images-by-author',
  templateUrl: './images-by-author.component.html',
  styleUrls: ['./images-by-author.component.scss']
})
export class ImagesByAuthorComponent implements OnInit {
  public images: any[] = []

  constructor(
    private gallery: GalleryService,
    private http: HttpClient
  ) { }

  public async ngOnInit(): Promise<void> {
    const images = await this.gallery.getImagesByAuthor()
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
