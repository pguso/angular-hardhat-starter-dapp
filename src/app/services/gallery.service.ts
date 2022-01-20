import { Injectable } from '@angular/core';
import { ethers } from "ethers";
import { environment } from "../../environments/environment";
import Gallery from '../../../artifacts/contracts/Gallery.sol/Gallery.json'
import detectEthereumProvider from "@metamask/detect-provider";

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  public async getAllImages(): Promise<any[]> {
    const contract = await GalleryService.getContract()

    return await contract['retrieveAllImages']()
  }

  public async getImagesByAuthor(): Promise<any[]> {
    const contract = await GalleryService.getContract(true)

    return await contract['retrieveImagesByAuthor']()
  }

  public async addImage(title: string, fileUrl: string): Promise<boolean> {
    const contract = await GalleryService.getContract(true)
    const transaction = await contract['store'](
      title,
      fileUrl
    )
    const tx = await transaction.wait()

    return tx.status === 1
  }

  private static async getContract(bySigner=false) {
    const provider = await GalleryService.getWebProvider()
    const signer = provider.getSigner()

    return new ethers.Contract(
      environment.contractAddress,
      Gallery.abi,
      bySigner ? signer : provider,
    )
  }

  private static async getWebProvider(requestAccounts = true) {
    const provider: any = await detectEthereumProvider()

    if (requestAccounts) {
      await provider.request({ method: 'eth_requestAccounts' })
    }

    return new ethers.providers.Web3Provider(provider)
  }
}
