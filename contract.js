/**
 * Created by forwardmomentum on 05.06.17.
 * API для вызовов на контракте-регуляторе
 */

let Web3 = require('web3');
let bigInt = require("big-integer");
let web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('http://192.168.72.233:8546'));

const abi = [{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"bills","outputs":[{"name":"id","type":"uint256"},{"name":"status","type":"uint256"},{"name":"reciever","type":"address"},{"name":"summ","type":"uint256"},{"name":"clientData","type":"string"},{"name":"payers","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"id","type":"uint256"}],"name":"getPayStatuses","outputs":[{"name":"","type":"int256[10]"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"id","type":"uint256"}],"name":"getBillById","outputs":[{"name":"","type":"uint256"},{"name":"","type":"address"},{"name":"","type":"uint256"},{"name":"","type":"string"},{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"id","type":"uint256"}],"name":"getAmounts","outputs":[{"name":"","type":"int256[10]"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint256"},{"name":"wallet","type":"address"}],"name":"confirm","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint256"},{"name":"reciever","type":"address"},{"name":"summ","type":"uint256"},{"name":"clientData","type":"string"},{"name":"payers","type":"string"},{"name":"wallets","type":"address[10]"},{"name":"amounts","type":"int256[10]"},{"name":"payStatuses","type":"int256[10]"}],"name":"saveOpenBill","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"id","type":"uint256"}],"name":"getWallets","outputs":[{"name":"","type":"address[10]"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint256"},{"name":"wallets","type":"address[10]"},{"name":"amounts","type":"int256[10]"}],"name":"setClosing","outputs":[],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"billId","type":"uint256"}],"name":"Closed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"billId","type":"uint256"}],"name":"Saved","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"billId","type":"uint256"}],"name":"Dead","type":"event"}];
const contractAddress = "0xabf69590eec661bcd14b30f5fdf012867baa2257";
const billerContract = web3.eth.contract(abi).at(contractAddress);

var activeBillid = 0;

billerContract.Saved(function(error, result) {
  console.log("Saved transaction");
  closeOpenBill(activeBillid);

  if (!error)
    console.log(result);
});

billerContract.Closed(function(error, result) {
  console.log("Closed");
  if (!error)
    console.log(result);
});

billerContract.Dead(function(error, result) {
  console.log("Completed bill");
  if (!error)
    console.log(result);
});


/**
 * Записать новый счет в контракт
 */
exports.saveOpenBill = (bill) => {
  web3.personal.unlockAccount(web3.eth.accounts[0], "password");

  billerContract.saveOpenBill.sendTransaction(bill.id, bill.receiver,
    bill.summ, JSON.stringify(bill.clientData), bill.payers.join(),[],[],[],{from: web3.eth.accounts[0], gas:1000000});
  activeBillid = bill.id;
};

/**
 * Сменить статус контракта на закрывающийся
 */
function closeOpenBill(billId)  {
  var bill = getBillById(billId);
  while(bill == undefined) {
    bill = getBillById(billId);
  }
  if (bill.type === 'open') {
    let partitions = bill.clientData.payers; // получаем разбивку по людям
    let wallets = partitions.map((part) => {return part.wallet;});
    let amounts = partitions.map((part) => {return part.amount;});
    web3.personal.unlockAccount(web3.eth.accounts[0], "password");
    billerContract.setClosing.sendTransaction(bill.id, wallets, amounts, {from: web3.eth.accounts[0], gas:1000000}); // пишем в блокчейн кто сколько будет платить
  }
}
exports.closeOpenBill = closeOpenBill;

/**
 * Подтвердить свое участие в оплате по счету
 */
exports.confirmPayment = (billId, wallet) => {
  web3.personal.unlockAccount(web3.eth.accounts[0], "password");
  billerContract.confirm.sendTransaction(billId, wallet, {from: web3.eth.accounts[0], gas:1000000});
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
function getBillById (billId) {
  let result =  getAllBills().filter((bill) => {return bill.id == billId;})[0];
  return result;
};
exports.getBillById = getBillById;

function getAllBills()  {
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
        clientData: JSON.parse(bill[3]),
        summ: parseInt(bill[2].toString(10)),
        payers: bill[4].split(','),
        receiver: bill[1]
      };

      if(type != "open") {
        let amounts = billerContract.getAmounts(i);
        let wallets = billerContract.getWallets(i);
        let payStatuses = billerContract.getPayStatuses(i);

        let payers = [];
        for(let i =0; i < 10; i++) {
          if(amounts[i] > 0) {
            let confirmed = payStatuses[i] == 2;
            payers.push({
              amount: amounts[i],
              wallet: wallets[i],
              confirmed: confirmed
            });
          }
        }
        b.payers = payers;
      }

      result.push(b);
    }
  }
  return result;
};
exports.getAllBills = getAllBills;

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