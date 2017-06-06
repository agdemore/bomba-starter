/**
 * Created by agdemore on 06.06.17.
 */
'use strict';

const mongo = require('./mongo.js');


let bills = [
    {
        id: "111",
        type: "open",
        clientData: JSON.stringify({id: 111, title: 'check', pay: 1000}),
        summ: 10,
        payers: ["0x75dCd745c79Ba87cE88C328b887Ee8A082B7c109", "0x49f2C47f1470989f4E0E8E3aa482f160A76Ee2Aa"],
        receiver: "0x1d7ED9A6f43C697d365715759f3281C0bc67EcfC"
    },
    {
        id: "222",
        type: "open",
        clientData: JSON.stringify({id: 222, title: 'check', pay: 1000}),
        summ: 7,
        payers: ["0x1d7ED9A6f43C697d36571575", "0x75dCd745c79Ba87cE88C328b887Ee8A082B7c109"],
        receiver: "0x49f2C47f1470989f4E0E8E3aa482f160A76Ee2Aa"
    },
    {
        id: "333",
        summ: 13,
        type: "closing",
        clientData: JSON.stringify({id: 333, title: 'check', pay: 1000}),
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

bills.map(async (bill) => {
   const b = new mongo.Bill(bill);
   await b.save();
});