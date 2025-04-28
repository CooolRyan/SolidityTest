// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract ERC1400 {
    string public name;
    string public symbol;
    uint8 public decimals;
    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;

    constructor(
        string memory _name,
        string memory _symbol,
        uint8 _decimals
    ) {
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
    }

    // [1] Issue (Mint)
    function issue(address to, uint256 amount, bytes calldata /*data*/) external {
        require(to != address(0), "ERC1400: issue to the zero address");
        totalSupply += amount;
        balanceOf[to] += amount;
    }

    // [2] Transfer
    function transfer(address to, uint256 amount) external returns (bool) {
        require(to != address(0), "ERC1400: transfer to the zero address");
        require(balanceOf[msg.sender] >= amount, "ERC1400: transfer amount exceeds balance");

        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;

        return true;
    }
}
