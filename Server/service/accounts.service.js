import Accounts from './../models/accounts';

export const getAccounts = async (query, limit, page) => {
    const skip = (page - 1) * limit;
    let account = await Accounts.find().limit(limit).skip(skip);
    return account
}

export const addAccount = async (account) => {
    const newAccount = new Accounts(account);
    const acc = await newAccount.save()
    if (!acc) {
        return false
    }
    return true
}

export const editAccount = async (account) => {
    const acc = await Accounts.updateOne(account);
    if (!acc) {
        return false
    }
    return true
}

export const getAccountByEmail = async (query) => {
    const acc = await Accounts.findOne(query);

    if (!acc) {
        return false
    }
    return acc
}

export const getAccountByAccNo = async (query) => {
    const acc = await Accounts.findOne(query);
    if (!acc) {
        return false
    }
    return acc
}

export const removeAccounts = async (id) => {
    const res = await Accounts.deleteOne(id);
    if (!res) {
        return false;
    }
    return true;
}

export const getAccountByIs = async (query) => {
    const acc = await Accounts.findOne(query);
    if (!acc) {
        return false
    }
    return acc
}