import { Component } from '@angular/core'
import { IpfsService } from "../../services/ipfs.service"
import { FormBuilder, Validators } from "@angular/forms"
import { Router } from "@angular/router"
import { GalleryService } from "../../services/gallery.service";

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent {
  public uploadForm = this.fb.group({
    title: this.fb.control('', Validators.required),
    fileUrl: this.fb.control('', Validators.required),
    description: this.fb.control('', Validators.required),
  })
  public uploadedImage = ''
  public formError = ''
  public isLoading = false

  constructor(
    private ipfs: IpfsService,
    private fb: FormBuilder,
    private router: Router,
    private gallery: GalleryService
  ) { }

  public async uploadImage(eventTarget: any) {
    const fileUrl = await this.ipfs.uploadFile(eventTarget.files[0])
    this.uploadedImage = fileUrl
    this.uploadForm.get('fileUrl')?.setValue(fileUrl)
  }

  public async onSubmit() {
    if (this.uploadForm.valid) {
      this.isLoading = true
      const title = this.uploadForm.get('title')?.value
      const fileUrl = this.uploadForm.get('fileUrl')?.value
      const description = this.uploadForm.get('description')?.value
      const metaDataUrl = await this.ipfs.uploadFile(JSON.stringify({
        fileUrl,
        description
      }))

      const isItemCreated = await this.gallery.addImage(title, metaDataUrl)

      this.isLoading = false
      if (isItemCreated) {
        await this.router.navigate([ '/authors-images' ]);
      }
    } else {
      console.error('form is not valid')
      this.formError = 'Form is not valid'
    }
  }
}
