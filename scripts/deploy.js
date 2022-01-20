const hre = require('hardhat')

async function main() {
  const Gallery = await hre.ethers.getContractFactory('Gallery')
  const gallery = await Gallery.deploy()
  await gallery.deployed()

  const txHash = gallery.deployTransaction.hash;
  const txReceipt = await hre.ethers.provider.waitForTransaction(txHash);
  console.log(`check your contract: https://mumbai.polygonscan.com/address/${txReceipt.contractAddress}`)
  console.log("contract address:", txReceipt.contractAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
