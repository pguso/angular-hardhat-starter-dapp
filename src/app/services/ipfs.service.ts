import { Injectable } from "@angular/core"
import { create } from "ipfs-http-client"
import { environment } from "../../environments/environment"

@Injectable({
  providedIn: 'root'
})
export class IpfsService {
  public async uploadFile(data: any): Promise<string> {
    let url = ''
    const client = IpfsService.getClient()

    try {
      const added = await client.add(data)
      url = `${environment.ipfs}/ipfs/${added.path}`
    } catch (error) {
      console.log(error)
    }

    return url
  }

  private static getClient(): any {
    // @ts-ignore
    return create(`${environment.ipfs}:5001/api/v0`)
  }
}
