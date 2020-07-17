import { constants } from './../helpers/constant';
import { getAccounts, getAccountByEmail, removeAccounts, getAccountByAccNo, addAccount, editAccount, getAccountByIs } from './../service/accounts.service';
import { message } from './../helpers/constant';
import mongoose from 'mongoose';

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
        const acc = await getAccountByIs({ _id: mongoose.Types.ObjectId(id) });
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
        const email = req.body.email;
        const account_number = req.body.account_number;
        const accByEmail = await getAccountByEmail({ email });
        const accByAccNo = await getAccountByAccNo({ account_number });
        if (accByEmail) {
            return res.json({ result: false, message: message.MSG008 })
        }
        if (accByAccNo) {
            return res.json({ result: false, message: message.MSG009 })
        }
        const result = await addAccount(req.body)
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
        const email = req.body.email;
        console.log(id, email)
        const account_number = req.body.account_number;
        const accByEmail = await getAccountByEmail({ email, _id: { $ne: req.body._id } });
        const accByAccNo = await getAccountByAccNo({ account_number, _id: { $ne: req.body._id } });
        if (accByEmail) {
            return res.json({ result: false, message: message.MSG005 })
        }
        if (accByAccNo) {
            return res.json({ result: false, message: message.MSG006 })
        }
        const result = await editAccount(req.body)
        if (!result) {
            return res.json({ result: false, message: message.MSG002 })
        }
        return res.json({
            result: true,
            message: message.MSG007
        })
    } catch (error) {
        console.log(error)
        return res.json({ result: false, message: message.MSG0000, status: 0 })
    }
}

export const authorFunction = (data) => async (req, res, next) => {
    if (!data.includes(req.user.role)) {
        return res.json({ result: false, status: 401 })
    }
    return next();


}
