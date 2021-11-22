const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const compiledFactory = require("../ethereum/build/CampaignFactory.json");
const compiledCampaign = require("../ethereum/build/Campaign.json");

let account;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
  account = await web3.eth.getAccounts();

  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: account[0], gas: "1000000" });

  await factory.methods.createCampaign("100").send({
    from: account[0],
    gas: "1000000",
  });

  const address = await factory.methods.getDeployCampaign().call();

  campaignAddress = address[0];
  campaign = await new web3.eth.Contract(
    JSON.parse(compiledCampaign.interface),
    campaignAddress
  );
});

describe("cAMPAIGN", () => {
  it("DEPLOYS A FACTORY AND A CAMPAIGN", () => {
    assert.ok(factory.options.address);

    assert.ok(campaign.options.address);
  });

  it("marks caller as the manger ", async () => {
    const manger = await campaign.methods.Manager().call();
    assert.equal(manger, account[0]);
  });

  it("allow contribution", async () => {
    await campaign.methods.contribute().send({
      from: account[1],
      value: "200",
    });

    const approver = await campaign.methods.approvers(account[1]).call();

    assert(approver);
  });

  it("allow contribution", async () => {
    try {
      await campaign.methods.contribute().send({
        value: "5",
        from: account[1],
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  it("it allows a manger to make a payment request", async () => {
    await campaign.methods.createRequest('Buy bok','100',account[3]).send({
      
        from: account[0],
        gas: "1000000"
      });

      const request = await campaign.methods.requests(0).call();
  
  assert.equal('Buy bok',request.description)
  
    });
});
