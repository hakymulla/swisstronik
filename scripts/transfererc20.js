const hre = require("hardhat");
const { encryptDataField, decryptNodeResponse } = require("@swisstronik/swisstronik.js");

const sendShieldedTransaction = async (signer, destination, data, value) => {
  const rpclink = hre.network.config.url;
  const [encryptedData] = await encryptDataField(rpclink, data);
  return await signer.sendTransaction({
    from: signer.address,
    to: destination,
    data: encryptedData,
    value,
  });
};

async function main() {
  const contractAddress = "0xf985521846e64a09183382ff915220CdFD3115D1";
  const [signer] = await hre.ethers.getSigners();
  const contractFactory = await hre.ethers.getContractFactory("Mulla");
  const contract = contractFactory.attach(contractAddress);
  const functionName = "transfer";
  const to = "0x16af037878a6cAce2Ea29d39A3757aC2F6F7aac1";
  const amount = '900000000000000';
  const sendTX = await sendShieldedTransaction(signer, contractAddress, contract.interface.encodeFunctionData(functionName, [to, amount]), 0);
  await sendTX.wait();
  console.log("Transaction Receipt: ", sendTX);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});