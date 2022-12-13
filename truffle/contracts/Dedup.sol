// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Dedup {
    // event SignatureAdded(string message, bytes32 name);

    // Store Data -->

    // Contract owner
    address public owner;

    // Array to store files uploaded by user
    mapping(bytes32 => bool) public uploadedFile;

    // Array to store owner of the file
    mapping(bytes32 => address) public fileOwner;

    // Structure to set interval for user
    // struct Interval {
    //   uint from;
    //   uint to;
    // }

    // Store user's interval mapped with user's address
    // mapping (address => Interval) public User;

    // Map file hash id with its cipher text
    mapping(bytes32 => bytes32) public fileCipherText;

    // Constructor -->
    constructor() {
        owner = msg.sender;
    }

    // Functions -->

    // Function to check if sender is contract owner
    modifier restricted() {
        require(
            msg.sender == owner,
            "This function is restricted to the contract's owner"
        );
        _;
    }

    function newFileUpload(bytes32 fileId) public returns (bool) {
        uploadedFile[fileId] = true;
        fileOwner[fileId] = msg.sender;
        return true;
    }

    function dedupFile(bytes32 fileId) public returns (bool) {
        uploadedFile[fileId] = true;
        sendViaCall(fileId);
        return true;
    }

    function checkFileExists(bytes32 fileId) public view returns (bool) {
        return uploadedFile[fileId];
    }

    function getFileOwner(bytes32 fileId) public view returns (address) {
        return fileOwner[fileId];
    }

    function sendViaCall(bytes32 fileId) public payable {
        // Call returns a boolean value indicating success or failure.
        address to = getFileOwner(fileId);
        (bool sent, ) = payable(to).call{value: msg.value}("");
        require(sent, "Failed to send Ether");
    }

    receive() external payable {}

    // Fallback function is called when msg.data is not empty
    fallback() external payable {}

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    // function getSecretKey() public view returns (bytes32) {
    //   uint current_date = block.timestamp;
    //   if(current_date >= User[msg.sender].from && current_date <= User[msg.sender].to) {
    //     return userSecretKey[msg.sender];
    //   }
    //   else
    //     return bytes32(bytes("User Unauthorized"));
    // }

    // function setInterval(address userAddress, uint no_of_days) public restricted returns (bool) {
    //   uint from = block.timestamp;
    //   uint to = from + no_of_days*1 days;
    //   // if(from >= to) return false;
    //   User[userAddress] = Interval(from, to);
    //   return true;
    // }
}
