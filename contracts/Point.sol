pragma solidity ^0.4.2;

// This is just a simple example of a coin-like contract.
// It is not standards compatible and cannot be expected to talk to other
// coin/token contracts. If you want to create a standards-compliant
// token, see: https://github.com/ConsenSys/Tokens. Cheers!

contract Point {
    
    struct customer {
        string name;
        uint point;
    }
    
    struct partner {
        string name;
    }
    
    struct shop {
        //uint date;
        address partner;
        address user;
        uint point;
    }
    
    
    struct transact {
        //uint date;
        address sender;
        address receiver;
        uint point;
    }
    
	mapping (address => customer) public customers;
	mapping (address => partner) public partners;
	mapping (uint => shop) public shops;
	mapping (uint => transact) public transacts;

    uint public transacts_count;

	constructor() public {}
	
	// Partner-side
	function createPartner(string _name) public {
		partners[msg.sender].name = _name;
	}

    // User-side
    function createUser(string _name) public {
		customers[msg.sender].name = _name;
		customers[msg.sender].point = 0;
	}
	
	function changePoint(address _partner, address _user, uint _point) public {
	    customers[_user].point += _point;
	    transacts_count++;
	    shops[transacts_count].partner = _partner;
	    shops[transacts_count].user = _user;
	    transacts[transacts_count].point = _point;
	}
	
	function transferPoint(address _sender, address _receiver, uint _point) public returns(bool)  {
	   
	   if(customers[_sender].point > _point){
	       return false;
	   }
	   
	    customers[_sender].point += _point;
	    customers[_receiver].point -= _point;
	    
	    transacts_count++;
	    transacts[transacts_count].sender = _sender;
	    transacts[transacts_count].receiver = _receiver;
	    transacts[transacts_count].point = _point;
	    
	    return true;
	}
	
	function resetPoint(address _receiver) public {
		customers[_receiver].point = 0;
	}
}
