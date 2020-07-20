import { getAccounts, getAccountByEmail, removeAccounts, getAccountByAccNo, addAccount, editAccount, getAccountById } from './../service/accounts.service';
import { message } from './../helpers/constant';
import mongoose from 'mongoose';
import { isNumber, validateRegex, getPaginationItems } from './../helpers/utils';

export const searchController = async (req, res) => {
    try {
        const { query } = req
        const pagination = getPaginationItems(query.page, query.limit)
        delete req.query.page;
        delete req.query.limit;
        const data = await getAccounts(query, pagination.limit, pagination.skip);
        return res.json({
            result: true,
            lstAccounts: data.accounts || [],
            page: query.page || 1,
            total: data.total || 0
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
        const name = req.body.name.trim();
        const email = req.body.email.trim();
        const address = req.body.address.trim();
        const age = req.body.age;
        const gender = req.body.gender;
        const balance = req.body.balance;
        const account_number = req.body.account_number.trim();
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
        if (gender === undefined || gender === null) {
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
        const name = req.body.name.trim();
        const email = req.body.email.trim();
        const address = req.body.address.trim();
        const age = req.body.age;
        const gender = req.body.gender;
        const balance = req.body.balance;
        const account_number = req.body.account_number.trim();
        if (!id) {
            return res.json({ result: false, message: message.MSG0014 })
        }
        const accByIds = await getAccountById({ _id: mongoose.Types.ObjectId(id) });
        if (!accByIds) {
            return res.json({ result: false, message: message.MSG0021 });
        }
        const accByEmail = await getAccountByEmail({ email, _id: { $ne: id } });
        const accByAccNo = await getAccountByAccNo({ account_number, _id: { $ne: id } });
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
        if (gender === undefined || gender === null) {
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
