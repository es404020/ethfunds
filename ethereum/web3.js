import Web3 from "web3";

// const web3 = new Web3(window.web3.currentProvider);
// window.addEventListener("load", async () => {
//     // Modern dapp browsers...
//     if (window.ethereum) {
//       window.web3 = new Web3(window.ethereum);
//       try {
//         // Request account access if needed
//         await window.ethereum.enable();
//       } catch (error) {
//         // User denied account access...
//       }
//     }
//     // Legacy dapp browsers...
//     else if (window.web3) {
//       window.web3 = new Web3(web3.currentProvider);
//     }
//     // Non-dapp browsers...
//     else {
//       console.log("Non-Ethereum browser detected. You should consider trying MetaMask!");
//     }
//   });

let web3;

if(typeof window !== 'undefined' && typeof window.web3 !== 'undefined'){
    web3 = new Web3(window.web3.currentProvider);
}
else{

    const provider  = new Web3.providers.HttpProvider(
        'HTTP://127.0.0.1:5777'
    );
    web3 = new Web3(provider)

}

export default web3;