
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

const compiledFactory = require("./build/CampaignFactory.json");
const compiledCampaign = require("./build/Campaign.json");



const provider = new HDWalletProvider('any casino grunt image language tree harsh celery doctor convince educate front',
'https://rinkeby.infura.io/v3/ea4177e3110044979e8b6763c434a59a'
); 


const web3 = new Web3(provider);


const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    
    console.log('Attempting to deploy from account', accounts[0]);
    
    const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data:  compiledFactory.bytecode })
        .send({ gas: '10000000', from: accounts[0] });


      
    
    console.log('Contract deployed to', result.options.address);
}

deploy();
















// const deploy = async () => {
//     const accounts = await web3.eth.getAccounts();
    
//     console.log('Attempting to deploy from account', accounts[0]);
    
//     const result = await new web3.eth.Contract(JSON.parse(interface))
//         .deploy({ data: bytecode,arguments: ['Hi there!'] })
//         .send({ gas: '1000000', from: '0xa7C9c2b9C5a943Bba27A7CF8cBb8009e5A24CBdb' });
    
//     console.log('Contract deployed to', result.options.address);
// }
