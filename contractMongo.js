/**
 * Created by agdemore on 06.06.17.
 */

const mongo = require('./mongo');


/**
 * Записать новый счет в контракт
 */
exports.saveOpenBill = async (bill) => {
    // даст команду на смарт контракт дабы сохранить в нем данные
    // здесь надо чекать статус и корректность входящего счета
    // на предмет существования таких счетов в блокчейне будет озадачиваться контракт
    await mongo.Bill.save(bill);
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
exports.getBillsByAccount = async (accountWallet) => {
    let bills = await mongo.Bill.find({});
    return bills.filter((bill) => {
        if (bill.payers.indexOf(accountWallet) > -1) return true;
        if (bill.receiver === accountWallet) return true;
        return false;
    })
};

/**
 * получить счет по id
 */
exports.getBillById = async (billId) => {
    return await mongo.Bill.findOne({ "id": billId});
    // return bills.filter((bill) => {return bill.id === billId;})[0];
};