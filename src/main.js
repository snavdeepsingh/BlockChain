const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const { Blockchain, Transaction } = require('./blockchain');
require('dotenv').config({path: '../.env'});

const myKey = ec.keyFromPrivate(process.env.PRIVATE_KEY);
const myWalletAddress = myKey.getPublic('hex');
console.log("🚀 ~ file: main.js ~ line 7 ~ myWalletAddress", myWalletAddress)


let navatarCoin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, 'public key goes here', 10);
tx1.signTransaction(myKey);
navatarCoin.addTransaction(tx1);

console.log("\n starting the miner...")
navatarCoin.minePendingTransactions(myWalletAddress);

console.log("\n Balance of NAVs-address: ", navatarCoin.getBalance(myWalletAddress));

console.log(navatarCoin.isChainValid());