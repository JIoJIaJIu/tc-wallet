[![version](https://img.shields.io/github/release/greymass/eos-voter/all.svg)](https://github.com/greymass/eos-voter/releases)
[![issues](https://img.shields.io/github/issues/greymass/eos-voter.svg)](https://github.com/greymass/eos-voter/issues)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/greymass/eos-voter/master/LICENSE)
![downloads](https://img.shields.io/github/downloads/greymass/eos-voter/total.svg)

[English](https://github.com/greymass/eos-voter/blob/master/README.md) - [한글](https://github.com/greymass/eos-voter/blob/master/README.kr.md) - [中文](https://github.com/greymass/eos-voter/blob/master/README.zh.md) - [日本語](https://github.com/greymass/eos-voter/blob/master/README.ja.md) - [Русский](https://github.com/greymass/eos-voter/blob/master/README.ru.md)

# TC-Wallet - TravelChain Block Producer Voting & Wallet

`tc-wallet` is a limited-functionality release of a light wallet being designed for the TravelChain blockchain. This application can be used to connect to a remote TravelChain API endpoint to perform producer voting actions and a few basic wallet commands.

[![eos-voter screenshot](https://raw.githubusercontent.com/greymass/eos-voter/master/eos-voter.png)](https://raw.githubusercontent.com/greymass/eos-voter/master/eos-voter.png)

### Features

- **Block Producer Voting**: Select which block producers to support and cast your vote. Please note that the block producer voting UI is not a research tool; it is a simple interface that provides a secure way to vote.
- **Token Transfers**: Transfer TravelTokens or any other token you may have a balance for to another user or exchanges.
- **CPU/Bandwidth Staking**: Stake your TravelTokens as either Bandwidth or CPU. This grants rights to resource usage on the network, in addition to conveying weight while voting for block producers.
- **Local Wallet**: Set a password while importing your private key to create a local wallet. Your key will be encrypted locally using this password. This password will be required each time you need to unlock the wallet.
- **Temporary Usage**: If you prefer not to store your keys within the application, simply choose not to set a password. When the application quits, your key will be forgotten.

## Get eos-voter

### Releases

Current 0.2.2 release downloads:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.2.2/win-eos-voter-0.2.2.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.2.2/mac-eos-voter-0.2.2.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.2.2/linux-eos-voter-0.2.2-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.2.2/linux-eos-voter-0.2.2-amd64.snap)

The latest release will always be available on the releases page of this repository:

[https://github.com/greymass/eos-voter/releases](https://github.com/TravelChain/tc-wallet/releases)

To determine which file you need, if you are a...

- **MacOS User**: Download either the DMG (`tc-wallet-***.dmg`) or ZIP (`tc-wallet-***-mac.zip`) file.
- **Windows User**: Download the EXE (`tc-wallet-***.exe`) file.
- **Linux User**: Download either the SNAP (`tc-wallet-***-_amd64.snap`) or DEB (`tc-wallet-***-_amd64.deb`) file

### Security: Private Keys

When using `tc-wallet`, all transactions are signed within the application and your key is never transmitted. If a local wallet password is specified, the application will also save and encrypt your key for future use, using AES-256 encryption. The current password/key encryption scheme can [currently be found here](https://github.com/aaroncox/eos-voter/blob/master/app/shared/actions/wallet.js#L71-L86).

### Build it yourself

If you'd rather build the application yourself, please ensure you have nodejs/npm/yarn already installed locally.

**Note**: If you are configuring this Electron application within a Windows development environment, it will involve additional steps.

```
git clone https://github.com/TravelChain/tc-wallet.git 
cd tc-wallet
yarn install
```

Then either:

- MacOS: `yarn package`
- Linux: `yarn package-linux`
- Windows: `yarn package-win`
- All: `yarn package-all`

The files built will be located in the `releases` folder within the root project folder.

### Running development mode

```
git clone https://github.com/TravelChain/tc-wallet.git
cd eos-voter
yarn install
yarn dev
```

shasum -b -a 512 mac-eos-voter-0.2.2.zip
355e7d18f462d7586af58acdfa7aff4c363e78d78d76a3c2cec9e3525e1c75a79ad988122f9b12337bcc1dfa78dfddec1deb3973aeb7fa5472cb3c036a581e06 *mac-eos-voter-0.2.2.zip

shasum -b -a 512 win-eos-voter-0.2.2.exe
56afe1adfa4dfa1b753db6f87b71f6b929e72003b4db50504e97b67990da067c4157c99062297522c6af067af921106f73375d4974c8e565e44816feabebff78 *win-eos-voter-0.2.2.exe

shasum -b -a 512 mac-eos-voter-0.2.2.dmg
56d17e0561c9ce9d06f9d1d159f5a77889d4ebb08f20e675823d3529c97c82b8108159f5144e171665c793d7ea7dc65e5b2c4bfe195ec0ae10866608855714b3 *mac-eos-voter-0.2.2.dmg
```
