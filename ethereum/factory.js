import web3 from "./web3";
import CampaignFactory from './build/CampaignFactory.json';


const instance = new web3.eth.Contract(
        JSON.parse(CampaignFactory.interface),
        '0x4188b1Fd66de406d20AC2C27d438DF511b337Ef5' 
)

export default instance;
//build/CampaignFactory.json