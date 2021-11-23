import web3 from "./web3";
import CampaignFactory from './build/CampaignFactory.json';


const instance = new web3.eth.Contract(
        JSON.parse(CampaignFactory.interface),
        '0xb9F273C8a235516089D84fD0feDEE1Ebe7d29c68' 
)

export default instance;
//build/CampaignFactory.json