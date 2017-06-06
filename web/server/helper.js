/**
 * Created by agdemore on 05.06.17.
 */
const crypto = require('crypto');

const gen = (function*() {
}).constructor;

export default {
    isGenerator: function (f) {
        if (!f) {
            return false;
        }

        return f.constructor === gen;
    },

    normalizePhone: function (str) {
        var phone = '';
        var goodPhone = true;

        var ignoredSymbols = new Set(['+', '(', ')', '-', ' ']);

        for (var i = 0; i < str.length; i++) {
            var c = str[i];

            if (ignoredSymbols.has(c)) {
                continue;
            } else if (c >= '0' && c <= '9') {
                phone += c;
            } else {
                goodPhone = false;
                break;
            }
        }

        if (!goodPhone) {
            return null;
        }

        return parseInt(phone.substr(phone.length - 10), 10);
    },

    getHash: function (str) {
        return crypto.createHash('md5').update(str).digest('hex');
    },

    generateToken : function () {

        return crypto.pseudoRandomBytes(64).toString('hex');
    }

}