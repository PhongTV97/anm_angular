import mongoose, { Schema } from 'mongoose';

import { lstAccountBanks } from '../data/accounts';

const accountSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    gender: {
        type: Number,
        enum: [0, 1],
        default: 0,
        required: true,
    },
    balance: {
        type: Number,
        required: true,
    },
    account_number: {
        type: String,
        required: true,
    },
})

const Account = mongoose.model('accounts', accountSchema)

export default Account;

Promise.all(
    lstAccountBanks.map((item) => {
        const query = { account_number: item.account_number };
        const update = item;
        const option = {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true
        }
        Account.findOneAndUpdate(query, update, option, function (err, res) {
        })
    })
)