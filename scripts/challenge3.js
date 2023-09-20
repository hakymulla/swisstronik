const ethers = require('ethers');

const contractAddress = '0xf84Df872D385997aBc28E3f07A2E3cd707c9698a';
const provider = ethers.getDefaultProvider('https://json-rpc.testnet.swisstronik.com/');

async function getStorage() {
  try {
    const value = await  provider.getStorage('0xf84Df872D385997aBc28E3f07A2E3cd707c9698a', 0);
    console.log('Retrieved Storage Value:', value);
  } catch (error) {
    console.error('Error:', error);
  }

}

getStorage();
