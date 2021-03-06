const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');



const buildPath = path.resolve(__dirname,'build');

  fs.removeSync(buildPath);


const campaignPath = path.resolve(__dirname,'contracts','campaign.sol');
const  source = fs.readFileSync(campaignPath,'utf8');
const output = solc.compile(source).contracts;

console.log(output)


fs.ensureDirSync(buildPath);


for (let contract in output){


    // console.log( contract)

    fs.outputJSONSync(
        path.resolve(buildPath,contract.replace(':','')+'.json'),
       output[contract]
    );
}