// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ShmeepsToken is ERC20, Ownable {

	mapping(address => bool) private admin;

	constructor() ERC20("Shmeep Coin", "SHMEEPS") {

	}

	function addAdmin(address account) external onlyOwner {
		admin[account] = true;
	}

	function deleteAdmin(address account) external onlyOwner {
		admin[account] = false;
	}

	function mint(address to, uint256 amount) external {
		require(admin[msg.sender], "only admins can mint.");
		_mint(to, amount);
	}
}