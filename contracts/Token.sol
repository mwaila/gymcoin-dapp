// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title GymToken
 * @dev Implementation of the GymToken ERC20 standard token contract.
 * This token is used for fitness ecosystem rewards and payments.
 * 
 * Features:
 * - Standard ERC20 functionality inherited from OpenZeppelin implementation
 * - Fixed total supply minted at deployment
 * - 18 decimal places (standard ERC20)
 * 
 * Deployed on Sepolia testnet at: 0x5dbB770Daa57c7f345E1e55024F0f06247f89682
 */
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract GymToken is ERC20 {
    /**
     * @dev Constructor that gives the msg.sender all existing tokens.
     * @param initialSupply The initial token supply (before applying decimals)
     *
     * The actual total supply will be initialSupply * 10^18
     */
    constructor(uint256 initialSupply) ERC20("Gym Token", "GYM") {
        _mint(msg.sender, initialSupply * 10 ** decimals());
    }
}
