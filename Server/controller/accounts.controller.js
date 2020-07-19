import { constants } from './../helpers/constant';
import { getAccounts, getAccountByEmail, removeAccounts, getAccountByAccNo, addAccount, editAccount, getAccountById } from './../service/accounts.service';
import { message } from './../helpers/constant';
import mongoose from 'mongoose';
import { isNumber, validateRegex } from './../helpers/utils';

export const searchController = async (req, res) => {
    try {
        let page = req.query.page || constants.DEFAULT_PAGE
        let limit = req.query.limit || constants.DEFAULT_LIMIT
        // let query = req.body.query;
        let query = {}
        const lstAccounts = await getAccounts(query, limit, page);
        return res.json({
            result: true,
            lstAccounts
        })
    } catch (error) {
        console.log(error)
        return res.json({ result: false, message: message.MSG0000, status: 0 })
    }
}

export const removeController = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.json({ result: false, message: message.MSG0014 })
        }
        const acc = await getAccountById({ _id: mongoose.Types.ObjectId(id) });
        if (!acc) {
            return res.json({ result: false, message: message.MSG002 })
        }
        const result = await removeAccounts({ _id: mongoose.Types.ObjectId(id) })
        if (!result) {
            return res.json({ result: false, message: message.MSG003 })
        }
        return res.json({
            result: true,
            message: message.MSG004
        })
    } catch (error) {
        console.log(error)
        return res.json({ result: false, message: message.MSG0000, status: 0 })
    }
}

export const addController = async (req, res) => {
    try {
        const id = req.params.id;
        const name = req.body.account_number;
        const email = req.body.email;
        const address = req.body.account_number;
        const age = req.body.account_number;
        const gender = req.body.account_number;
        const balance = req.body.account_number;
        const account_number = req.body.account_number;

        if (!email) {
            return res.json({ result: false, message: message.MSG0013 })
        }
        if (!validateRegex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, email)) {
            return res.json({ result: false, message: message.MSG0014 })
        }
        if (!account_number || account_number.length > 13) {
            return res.json({ result: false, message: message.MSG0015 })
        } else {
            if (!isNumber(account_number)) {
                return res.json({ result: false, message: message.MSG0019 })
            }
        }

        const accByEmail = await getAccountByEmail({ email });
        const accByAccNo = await getAccountByAccNo({ account_number });
        if (accByEmail) {
            return res.json({ result: false, message: message.MSG008 })
        }
        if (accByAccNo) {
            return res.json({ result: false, message: message.MSG009 })
        }
        if (!name) {
            return res.json({ result: false, message: message.MSG0016 })
        }
        if (!address) {
            return res.json({ result: false, message: message.MSG0016 })
        }
        if (!age) {
            return res.json({ result: false, message: message.MSG0017 })
        } else {
            if (!isNumber(age)) {
                return res.json({ result: false, message: message.MSG0018 })
            }
        }
        if (!gender) {
            return res.json({ result: false, message: message.MSG0022 })
        } else {
            if (!isNumber(gender)) {
                return res.json({ result: false, message: message.MSG0018 })
            }
        }

        if (!balance) {
            return res.json({ result: false, message: message.MSG0023 })
        } else {
            if (!isNumber(balance)) {
                return res.json({ result: false, message: message.MSG0024 })
            }
        }
        const account = {
            name,
            email,
            address,
            age,
            gender,
            balance,
            account_number,
        }
        const result = await addAccount(account)
        if (!result) {
            return res.json({ result: false, message: message.MSG002 })
        }
        return res.json({
            result: true,
            message: message.MSG0010
        })
    } catch (error) {
        console.log(error)
        return res.json({ result: false, message: message.MSG0000, status: 0 })
    }
}

export const editController = async (req, res) => {
    try {
        const id = req.params.id;
        const name = req.body.account_number;
        const email = req.body.email;
        const address = req.body.account_number;
        const age = req.body.account_number;
        const gender = req.body.account_number;
        const balance = req.body.account_number;
        const account_number = req.body.account_number;

        if (!id) {
            return res.json({ result: false, message: message.MSG0014 })
        }
        const accByIds = await getAccountById({ _id: mongoose.Types.ObjectId(id) });
        if (!accByIds) {
            return res.json({ result: false, message: message.MSG0021 });
        }
        const accByEmail = await getAccountByEmail({ email, _id: { $ne: req.body._id } });
        const accByAccNo = await getAccountByAccNo({ account_number, _id: { $ne: req.body._id } });
        if (accByEmail) {
            return res.json({ result: false, message: message.MSG005 });
        }
        if (accByAccNo) {
            return res.json({ result: false, message: message.MSG006 });
        }
        if (!name) {
            return res.json({ result: false, message: message.MSG0016 })
        }
        if (!address) {
            return res.json({ result: false, message: message.MSG0016 })
        }
        if (!age) {
            return res.json({ result: false, message: message.MSG0017 })
        } else {
            if (!isNumber(age)) {
                return res.json({ result: false, message: message.MSG0018 })
            }
        }
        if (!gender) {
            return res.json({ result: false, message: message.MSG0022 })
        } else {
            if (!isNumber(gender)) {
                return res.json({ result: false, message: message.MSG0018 })
            }
        }

        if (!balance) {
            return res.json({ result: false, message: message.MSG0023 })
        } else {
            if (!isNumber(balance)) {
                return res.json({ result: false, message: message.MSG0024 })
            }
        }
        const account = {
            name,
            email,
            address,
            age,
            gender,
            balance,
            account_number,
        }
        const result = await editAccount(account)
        if (!result) {
            return res.json({ result: false, message: message.MSG002 });
        }
        return res.json({
            result: true,
            message: message.MSG007
        })
    } catch (error) {
        console.log(error)
        return res.json({ result: false, message: message.MSG0000, status: 0 });
    }
}

export const authorFunction = (data) => async (req, res, next) => {
    if (!data.includes(req.user.role)) {
        return res.json({ result: false, message: message.MSG0020 });
    }
    return next();
}
