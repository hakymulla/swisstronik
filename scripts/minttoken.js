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
  const functionName = "mint";
  const to = "0x427aE6048C7d2DEd45a07Ea46F2873d0F9ddDb35";
  const amount = '9000000000000000';
  const sendTX = await sendShieldedTransaction(signer, contractAddress, contract.interface.encodeFunctionData(functionName, [to, amount]), 0);
  await sendTX.wait();
  console.log("Transaction Receipt: ", sendTX);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});