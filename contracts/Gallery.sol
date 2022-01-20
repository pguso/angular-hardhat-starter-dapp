// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract Gallery {
  Image[] private images;
  mapping(address => Image[]) private authorToImages;

  struct Image {
    string title;
    string imageMetaDataUrl;
  }

  function store(string memory title, string memory imageMetaDataUrl) public {
    Image memory image = Image(title, imageMetaDataUrl);

    images.push(image);
    authorToImages[msg.sender].push(image);
  }

  function retrieveAllImages() public view returns (Image[] memory) {
    return images;
  }

  function retrieveImagesByAuthor() public view returns (Image[] memory) {
    return authorToImages[msg.sender];
  }
}
