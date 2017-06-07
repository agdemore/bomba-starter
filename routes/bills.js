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
    contractAPI = require('../contract');
    // contactsMongo = require('../contractMongo');

router.use(checkToken);

router.get('/', (req, res, next) => {

});

router.post('/', (req, res, next) => {
    let data = req.body;
  res.json(contractAPI.getAllBills());

    // let wallet = (data.wallet) ? data.wallet : undefined;
    // if (wallet) {
    //     let bills = contractAPI.getAllBills(); // todo for account
    //     let billsForClient = [];
    //     bills.map((bill) => {
    //         billsForClient.push(JSON.parse(bill.clientData));
    //     });
    //     res.json(billsForClient);
    // } else {
    //     res.json({ error: true })
    // }
});

router.get('/:billId', (req, res, next) => {
    const billId = req.params.billId;
    if (billId) {
        let clientData = contractAPI.getBillById(billId).clientData;
        res.json(JSON.parse(clientData));
    } else {
        res.json({ error: true })
    }
});

router.post('/saveOpenBill', (req, res, next) => {
    let bill = req.body;
    let billClientData = (bill.clientData) ? bill.clientData : undefined;
    if (billClientData) {
        let creatingBill;
        if (bill.id) {
          creatingBill = contractAPI.getBillById(bill.id);
        } else {
            //new bill
            creatingBill = bill;
            // while (!contractAPI.getBillById(creatingBill.id)) {
              creatingBill.id = _.random(20);
            // }
            creatingBill.type = 'open';
        }
        creatingBill.clientData = billClientData;
        contractAPI.saveOpenBill(bill);
    } else {
        res.json({ error: true });
    }
});

router.post('/closeOpenBill', (req, res, next) => {
    let bill = req.body;
    contractAPI.closeOpenBill(bill);
});

router.post('/confirm', (req, res, next) => {
  let data = req.body;
  contractAPI.confirmPayment(data.billId, data.wallet);
});

module.exports = router;