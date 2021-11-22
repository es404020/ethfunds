const path = require('path');
const fs = require('fs');
const solc = require('solc')

const lotteryPath = path.resolve(__dirname,'contacts','campaign.sol')
const  source = fs.readFileSync(lotteryPath,'utf8');
//  console.log( solc.compile(source)
module.exports = solc.compile(source).contracts[':CampaignFactory'];



// const inboxPath = path.resolve(__dirname,'contacts','inbox.sol')
// const  source = fs.readFileSync(inboxPath,'utf8');
// // console.log( solc.compile(source))
// module.exports = solc.compile(source).contracts[':Inbox'];



// const lotteryPath = path.resolve(__dirname,'contacts','lottery.sol')
// const  source = fs.readFileSync(lotteryPath,'utf8');
//   console.log( solc.compile(source))
// //module.exports = solc.compile(source).contracts[':Lottery'];