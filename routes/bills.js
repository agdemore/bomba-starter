/**
 * Created by agdemore on 06.06.17.
 */
'use strict';

const express = require('express'),
    router = express.Router(),
    _ = require('lodash'),
    db = require('../db'),
    checkToken = require('../middlewares').checkToken,
    moment = require('moment'),
    uuid = require('node-uuid'),
    contractAPI = require('../contract'),
    contactsMongo = require('../contractMongo');

router.use(checkToken);

router.get('/', (req, res, next) => {

});

router.post('/', async (req, res, next) => {
    let data = req.body;

    let wallet = (data.wallet) ? data.wallet : undefined;
    if (wallet) {
        let bills = await contactsMongo.getBillsByAccount(wallet);//todo contractAPI.getBillsByAccount(wallet);
        let billsForClient = [];
        bills.map((bill) => {
            billsForClient.push(JSON.parse(bill.clientData));
        });
        res.json({ error: false, bills: billsForClient});
    } else {
        res.json({ error: true })
    }
});

router.get('/:billId', async (req, res, next) => {
    const billId = req.params.billId;
    if (billId) {
        let bill = await contactsMongo.getBillById(billId); //todo contractAPI.getBillById(billId).clientData;
        res.json({ error: false, bill: JSON.parse(bill.clientData) });
    } else {
        res.json({ error: true })
    }
});

router.post('/saveOpenBill', async (req, res, next) => {
    let data = req.body;
    let billClientData = (data.bill) ? data.bill : undefined;
    if (billClientData) {
        let bill;
        if (billClientData.id) {
            bill = await contactsMongo.getBillById(billClientData.id);//todo contractAPI.getBillById(billClientData.id);
        } else {
            //new bill
            bill = {};
            while (await contactsMongo.getBillById(bill.id)) { //todo contractAPI.getBillById(bill.id)
                bill.id = _.random(100);
            }
            bill.summ = billClientData.pay;
            bill.type = 'open';
            bill.receiver = billClientData.receiver;
        }

        // bill.clientData = billClientData;

        bill.clientData = billClientData;

        bill.payers = billClientData.payers.map(payer => {
            return payer.wallet;
        });
        bill.pays = billClientData.payers;

        await contactsMongo.saveOpenBill(bill)//todo contractAPI.saveOpenBill(bill);
    } else {
        res.json({ error: true });
    }
});

router.post('/closeOpenBill', (req, res, next) => {
    let data = req.body;
    let billClientData = (data.bill) ? data.bill : undefined;
    if (billClientData) {
        contractAPI.closeOpenBill(billClientData.id);
    } else {
        res.json({ error: true });
    }
});

module.exports = router;