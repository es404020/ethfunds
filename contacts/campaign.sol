// pragma solidity >=0.4.17;


// contract CampaignFactory{
//     address[] public deployedCampaigns;

//     function createCampaign(uint mini) public {
//         address newCampaign  = new Campaign(mini,desc,msg.sender);

//         deployedCampaigns.push(newCampaign);
//     }

//     function getDeployCampaign() public view returns (address[]){
//         return deployedCampaigns;
//     }
// }



// contract Campaign {
//     struct Request {
//         string description;
//         uint256 value;
//         address recipient;
//         bool completed;
//         uint256 approvalCount;
//         mapping(address => bool) approvals;
//     }

//     address public Manager;
//     uint256 public minimumContribution;
//     string public descCampaigns;
//     Request[] public requests;
//     uint public approversCount;

//     //address[] public approvers;
//     mapping(address => bool) public approvers;
//     modifier restrited() {
//         require(msg.sender == Manager);

//         _;
//     }

//   function Campaign(uint minimum,string desc, address creator) public {
//         Manager = creator;
//         minimumContribution = minimum;
//         descCampaigns = desc;
//     }

//     function contribute() public payable {
//         require(msg.value > minimumContribution);
//         approvers[msg.sender] = true;
//         approversCount++;
//     }

//     function createRequest(
//         string memory _description,
//         uint256 _value,
//         address _recipient
//     ) public restrited {
//         //   require(_value > minimumContribution);
//         Request memory request = Request({
//             description: _description,
//             value: _value,
//             recipient: _recipient,
//             completed: false,
//             approvalCount: 0
//         });
//         requests.push(request);
//         // Request storage Newrequest = requests.push();
//         //  Newrequest.description=_description;
//         //  Newrequest.value=_value;
//         //  Newrequest.recipient=_recipient;
//         //  Newrequest.completed=false;
//         //  Newrequest.approvalCount=0;
//     }

//     function approveRequest(uint256 index) public {
//         Request storage request = requests[index];

//         require(approvers[msg.sender]);
//         require(!request.approvals[msg.sender]);

//         request.approvalCount++;
//         request.approvals[msg.sender] = true;
//     }

//     function finalizeRequest(uint index) public restrited {
//         Request storage request = requests[index];

//         require(!request.completed);
//         require(request.approvalCount > (approversCount /2 ));


//         request.recipient.transfer(request.value);
//         request.completed = true;
//     }
// }
