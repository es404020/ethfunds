
pragma solidity >=0.4.17;


contract Lottery {
 
 address public Manager;  

 address[] public Player;


 address public winner;  
 




function Lottery() public{

    Manager = msg.sender;
}

function enter() public restrictedPlayer payable{
  

    Player.push(msg.sender);

}

function PickWinner() public restricted {



    uint index = random() % Player.length;

    Player[index].transfer(this.balance);

    winner = Player[index];

    Player = new address[](0);     
}




function random() private view returns(uint) {

 return   uint(keccak256(block.difficulty,now,Player));


}

function getAllPlayers()public view returns (address[]){

    return Player;

}

modifier restricted(){
    require(msg.sender == Manager);
    _;
}

modifier restrictedPlayer(){
      require(msg.value > .01 ether);
    _;
}


}