/**
 * Created by forwardmomentum on 05.06.17.
 * API для вызовов на контракте-регуляторе
 */

let Web3 = require('web3');
let web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('http://192.168.72.233:8545'));

const abi = [{"constant":false,"inputs":[{"name":"receiver","type":"address"},{"name":"amount","type":"uint256"}],"name":"sendCoin","outputs":[{"name":"sufficient","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"coinBalanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[{"name":"supply","type":"uint256"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"sender","type":"address"},{"indexed":false,"name":"receiver","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"CoinTransfer","type":"event"}];
const contractAddress = "0xcfcf3bc7ff72012d57ff642d1defb895fb786b86";

// тестовый набор биллей
let bills = [
  {
    id: "111",
    type: "open",
    clientData: "",
    summ: 10,
    payers: ["0x75dCd745c79Ba87cE88C328b887Ee8A082B7c109", "0x49f2C47f1470989f4E0E8E3aa482f160A76Ee2Aa"],
    receiver: "0x1d7ED9A6f43C697d365715759f3281C0bc67EcfC"
  },
  {
    id: "222",
    type: "open",
    clientData: "",
    summ: 7,
    payers: ["0x1d7ED9A6f43C697d36571575", "0x75dCd745c79Ba87cE88C328b887Ee8A082B7c109"],
    receiver: "0x49f2C47f1470989f4E0E8E3aa482f160A76Ee2Aa"
  },
  {
    id: "333",
    summ: 13,
    type: "closing",
    clientData: "",
    payers: ["0x1d7ED9A6f43C697d365715759f3281C0bc67EcfC", "0x75dCd745c79Ba87cE88C328b887Ee8A082B7c109"],
    receiver: "0x49f2C47f1470989f4E0E8E3aa482f160A76Ee2Aa",
    pays: [
      {
        wallet: "0x1d7ED9A6f43C697d365715759f3281C0bc67EcfC",
        amount: 8,
        confirmed: false
      },
      {
        wallet: "0x75dCd745c79Ba87cE88C328b887Ee8A082B7c109",
        amount: 5,
        confirmed: true
      }
    ]
  }
];


/**
 * Записать новый счет в контракт
 */
exports.saveOpenBill = (bill) => {
  // даст команду на смарт контракт дабы сохранить в нем данные
  // здесь надо чекать статус и корректность входящего счета
  // на предмет существования таких счетов в блокчейне будет озадачиваться контракт
};

/**
 * Сменить статус контракта на закрывающийся
 */
exports.closeOpenBill = (bill) => {
  // проверит что билль вообще можно закрывать (сумма, участники и все такое)
  // кинет на смарт вызов закрытия билля
  // получит билль новой структуры (с payments списком)
};

/**
 * Подтвердить свое участие в оплате по счету
 */
exports.confirmPayment = (billId, accountId) => {
  // даст команду кошельку accountId сделать перевод на контракт в честь счета с billId
};

/**
 * получить счета в которых фигурирует данный аккаунт
 */
exports.getBillsByAccount = (accountWallet) => {
  return bills.filter((bill) => {
    if (bill.payers.indexOf(accountWallet) > -1) return true;
    if (bill.receiver === accountWallet) return true;
    return false;
  });
};

/**
 * получить счет по id
 */
exports.getBillById = (billId) => {
  return bills.filter((bill) => {return bill.id === billId;})[0];
};

exports.getMainAccBalance = function test() {
  return web3.eth.getBalance(web3.eth.coinbase).toNumber();
};


/**
 * TEST STUFF
 */


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