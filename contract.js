/**
 * Created by forwardmomentum on 05.06.17.
 * API для вызовов на контракте-регуляторе
 */

let Web3 = require('web3');
let bigInt = require("big-integer");
let web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('http://192.168.72.233:8545'));


const abi = [{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"bills","outputs":[{"name":"id","type":"uint256"},{"name":"status","type":"uint256"},{"name":"reciever","type":"address"},{"name":"summ","type":"uint256"},{"name":"clientData","type":"string"},{"name":"payers","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"id","type":"uint256"}],"name":"getBillById","outputs":[{"name":"","type":"uint256"},{"name":"","type":"address"},{"name":"","type":"uint256"},{"name":"","type":"string"},{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint256"},{"name":"reciever","type":"address"},{"name":"summ","type":"uint256"},{"name":"clientData","type":"string"},{"name":"payers","type":"string"}],"name":"saveOpenBill","outputs":[],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"}];
const contractAddress = "0xb22e5bf814b3e2d81c6ea08b8f2cdebe5e46714c";
const billerContract = web3.eth.contract(abi).at(contractAddress);

// тестовый набор биллей
let bills = [
  {
    id: 1,
    type: "open",
    clientData: "",
    summ: 13,
    payers: ["0x75dCd745c79Ba87cE88C328b887Ee8A082B7c109", "0x49f2C47f1470989f4E0E8E3aa482f160A76Ee2Aa"],
    receiver: "0x1d7ED9A6f43C697d365715759f3281C0bc67EcfC"
  },
  {
    id: 2,
    type: "open",
    clientData: "",
    summ: 7,
    payers: ["0x1d7ED9A6f43C697d36571575", "0x75dCd745c79Ba87cE88C328b887Ee8A082B7c109"],
    receiver: "0x49f2C47f1470989f4E0E8E3aa482f160A76Ee2Aa"
  },
  {
    id: 3,
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
  web3.personal.unlockAccount(web3.eth.accounts[0], "password");
  billerContract.saveOpenBill.sendTransaction(bill.id, bill.receiver, bill.summ, bill.clientData, bill.payers.join(), [], [], {from: web3.eth.accounts[0], gas:1000000});
};

/**
 * Сменить статус контракта на закрывающийся
 */
exports.closeOpenBill = (bill) => {
  this.saveOpenBill(bill);
  // по успеху - пока ждем сидим
  let b = this.getBillById(bill.id);
  if (b.type === 'open') {
    let partitions = this.getPartition(bill.clientData); // получаем разбивку по людям
    let s = 0;
    for (let ind in partitions) {
      s += partitions[ind].amount;
      if(b.payers.indexOf(partitions[ind].wallet) > -1) return {result: 'error', message: "payer not from payers"}; // в этой
    }

    if (s === b.summ) { // разбивка корректная можно посылать на контракт закрытие
      let wallets = partitions.map((part) => {return part.wallet;});
      let amounts = partitions.map((part) => {return part.amount;});
      billerContract.setClosing(bill.id, wallets, amounts); // пишем в блокчейн кто сколько будет платить
      // по исполнении делаем оповещения всех ребят
      return {result: "success"}
    }
    else {
      return {result: 'error', message: "сумма не сошлась"};
    }
  }
  else {
    // по идее ничего не делать
  }
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
  return this.getAllBills().filter((bill) => {
    if (bill.payers.indexOf(accountWallet) > -1) return true;
    if (bill.receiver === accountWallet) return true;
    return false;
  });
};

/**
 * получить счет по id
 */
exports.getBillById = (billId) => {
  return this.getAllBills().filter((bill) => {return bill.id === billId;})[0];
};

exports.getMainAccBalance = function test() {
  return web3.eth.getBalance(web3.eth.coinbase).toNumber();
};

exports.getAllBills = () => {

  return bills;

  web3.personal.unlockAccount(web3.eth.accounts[0], "password");
  let result = [];
  for(let i = 0; i < 20; i++) {
    var bill = billerContract.getBillById(i);
    if (bill[0] != 0) {

      var type = "open";
      if(bill[0] == 2) {
        type = "closing";
      }
      if(bill[0] == 3) {
        type = "dead";
      }

      let b = {
        id: i,
        type: type,
        clientData: bill[3],
        summ: parseInt(bill[2].toString(10)),
        payers: bill[4].split(','),
        receiver: bill[1]
      };

      result.push(b);
    }
  }
  return result;

};

exports.getPartition = (clientData) => {
  // разобрать clientData и соорудить структуру типа
  return [
    {
      wallet: "0x75dCd745c79Ba87cE88C328b887Ee8A082B7c109",
      amount: 8
    },
    {
      wallet: "0x49f2C47f1470989f4E0E8E3aa482f160A76Ee2Aa",
      amount: 5
    }];
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