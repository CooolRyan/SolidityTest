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
        bytes32[] memory _partitions,
        uint8 _decimals,
        address[] memory _controllers,
        address[] memory _issuers
    ) {
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
        totalSupply = 1000000 * (10 ** uint256(_decimals));
        balanceOf[msg.sender] = totalSupply;
    }



     // =============================
    // [1] Mint 기능 추가
    // =============================
    function mint(address to, uint256 amount) public {
        require(to != address(0), "ERC1400: mint to the zero address");
        totalSupply += amount;
        balanceOf[to] += amount;
    }

    // =============================
    // [2] Transfer 기능 추가
    // =============================
    function transfer(address to, uint256 amount) public returns (bool) {
        require(to != address(0), "ERC1400: transfer to the zero address");
        require(balanceOf[msg.sender] >= amount, "ERC1400: transfer amount exceeds balance");

        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;

        return true;
    }
}
