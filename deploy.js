
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./complie');



const provider = new HDWalletProvider('silly must monkey raw letter song aspect cloud love similar pioneer pudding',
'HTTP://127.0.0.1:5777'
); 


const web3 = new Web3(provider);


const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    
    console.log('Attempting to deploy from account', '0xa7C9c2b9C5a943Bba27A7CF8cBb8009e5A24CBdb');
    
    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode })
        .send({ gas: '1000000', from:  '0xa7C9c2b9C5a943Bba27A7CF8cBb8009e5A24CBdb' });


        console.log(interface);
    
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
