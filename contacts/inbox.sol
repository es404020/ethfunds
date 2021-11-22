// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.17;


contract Inbox{
 string public message;

   function Inbox(string  memory name) public {

    message = name;
    
}

    function setMessage(string memory _message) public{
    message = _message;
    }



}



