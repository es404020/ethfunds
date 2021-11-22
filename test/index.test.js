
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const { interface, bytecode } = require('../complie');


let account;
let inbox;

beforeEach(async () => {

    account = await web3.eth.getAccounts();


    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Hi there'] })
        .send({ from: account[1], gas: '1000000' })



});


describe('Inbox', () => {
    it('deploy contact', () => {
        assert.ok(inbox.options.address)
    })

    it('get default ', async () => {
        const messsage = await inbox.methods.message().call();

        assert.equal(messsage, 'Hi there')
    })

    it('update  message', async () => {
        await inbox.methods.setMessage('ok').send({
            from: account[1]
        });
        const messsage = await inbox.methods.message().call();
        assert.equal(messsage, 'ok')
    })
})



//  class Car {
//      pack(){
//          return 'stop'
//      }
//      drive(){
//          return 'move';
//      }
//  }


//  describe('car',()=>{

//     let car;
//     beforeEach(()=>{
//          car = new Car();
//     })


//      it('pack',()=>{


//          assert.equal(car.pack(),'stop');
//          assert.equal(car.drive(),'move');
//      })
//      it('move',()=>{



//         assert.equal(car.drive(),'move');
//     })
//  })