/**
 * Created by forwardmomentum on 05.06.17.
 * API для вызовов на контракте-регуляторе
 */

let Web3 = require('web3');
let web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('http://192.168.72.233:8545'));

const abi = [{"constant":false,"inputs":[{"name":"receiver","type":"address"},{"name":"amount","type":"uint256"}],"name":"sendCoin","outputs":[{"name":"sufficient","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"coinBalanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[{"name":"supply","type":"uint256"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"sender","type":"address"},{"indexed":false,"name":"receiver","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"CoinTransfer","type":"event"}];
const contractAddress = "0xcfcf3bc7ff72012d57ff642d1defb895fb786b86";

/**
 * Записать новый счет в контракт
 */
exports.registerBill = (bill) => {
  // todo записать bill в контракт
};

/**
 *
 */
exports.enterToBill = (accountId) => {
  // todo осуществить перевод денег из входящего в сделку аккаунта на смарт контракт
};

/**
 * получить счета в которых фигурирует данный аккаунт
 */
exports.getBillsByAccount = () => {
  // todo запросить у контракта билли связанные с аккаунтом (в любой роли)
};

/**
 * получить счет по id
 */
exports.getBillById = (billId) => {
  // todo запросить билль у контракта по billId
};

exports.getMainAccBalance = function test() {
  return web3.eth.getBalance(web3.eth.coinbase).toNumber();
};














exports.doSomethingWithContract = function() {
  var tokensContract = web3.eth.contract(abi).at(contractAddress);

  console.log(tokensContract.coinBalanceOf(web3.eth.accounts[1]) + " tokens");

  var event = tokensContract.CoinTransfer({}, '', function(error, result){
    if (!error)
      console.log("Coin transfer: " + result.args.amount + " tokens were sent. Balances now are as following: " +
        "\n Sender:\t" + result.args.sender + " \t" + tokensContract.coinBalanceOf.call(result.args.sender) +
        " tokens \n Receiver:\t" + result.args.receiver + " \t" + tokensContract.coinBalanceOf.call(result.args.receiver) + " tokens" )
  });
  //
  web3.personal.unlockAccount(web3.eth.accounts[0], "password"); // кибербезопасность во плоти

  // если раскомменить строчку ниже будет транзакция треш и мясо
  // tokensContract.sendCoin.sendTransaction(web3.eth.accounts[1], 1000, {from: web3.eth.accounts[0]})

};

// /**
//  * Checks tokens smart contract is deployed
//  */
// exports.contractIsDeployed = function () {
//
//
//   return true;
// };
//
// /**
//  * Deploys tokens smart-contract
//  */
// exports.deployContract = function(supply) {
//
// };