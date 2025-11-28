# Crypto Inheritance & Will Smart Contract

A decentralized solution for digital asset inheritance deployed on the Flare Network (Coston2 Testnet). This application allows users to create immutable digital wills, locking funds that can only be claimed by designated beneficiaries.

## Contract Details

- **Network**: Flare Coston2 Testnet
- **Contract Address**: [`0x61DB787B8aCD014CF5419c9A69aE968bc3476dcf`](https://coston2-explorer.flare.network/address/0x61DB787B8aCD014CF5419c9A69aE968bc3476dcf)
- <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/8f9fa75c-b358-4382-8c1e-708c35d4911c" />

- **Token**: C2FLR (Coston2 Flare)

## Description

The Crypto Inheritance project addresses a critical issue in the cryptocurrency space: the loss of assets due to lost private keys or the incapacitation of the asset holder. This smart contract acts as a trustless vault where users (Testators) can deposit funds and assign them to specific recipients (Beneficiaries). Unlike traditional legal wills which require intermediaries, this system executes strictly according to code.

The application interacts with a Solidity smart contract to facilitate the depositing of funds (Creating a Will) and the retrieval of funds (Claiming a Will) by the rightful heirs.

## Features

- **Create Wills**: Users can deposit C2FLR into the smart contract and specify a beneficiary address.
- **Multiple Wills**: A single user can create multiple independent wills for different beneficiaries or amounts.
- **Claim Mechanism**: Beneficiaries can claim the funds allocated to them by specifying the original owner's address and the specific will index.
- **Balance Tracking**: Real-time display of the total contract balance and the number of active wills created by the connected user.
- **Wallet Integration**: Seamless connection with EVM-compatible wallets (Metamask, etc.) via Wagmi/Viem.

## How It Solves the Inheritance Problem

### The Problem
In decentralized finance, "Not your keys, not your coins" creates a single point of failure. If an investor passes away or loses access to their wallet management, their assets are typically lost forever in the void, as no family member or lawyer can access the cryptographic keys.

### The Solution
This project solves this by creating a programmable "Dead Man's Switch" or Direct Inheritance logic:

1.  ** proactive Allocation**: The user proactively creates a will on-chain, effectively moving funds to a neutral, code-governed vault.
2.  **Trustless Execution**: The transfer of assets does not rely on a lawyer or bank. It relies solely on the beneficiary proving their identity (via their wallet address) matching the one stored in the contract.
3.  **Accessibility**: The beneficiary does not need the original owner's private keys. They only need to know that a will exists for them, and they can claim it using their own wallet.

This ensures that digital wealth can be passed on securely and transparently without sharing sensitive private keys during the owner's lifetime.
