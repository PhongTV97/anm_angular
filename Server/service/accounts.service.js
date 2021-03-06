import Accounts from './../models/accounts';

export const getAccounts = async (query, limit, skip) => {
    const name = new RegExp(query.name, 'i')
    const email = new RegExp(query.email, 'i')
    const address = new RegExp(query.address, 'i')
    const age = query.age || null
    const gender = query.gender || null
    const balance = query.balance || null
    const account_number = new RegExp(query.account_number, 'i')
    const col = query.col || null
    const sort = query.sort || null
    let sortCondition = {}
    const queryDb = {
        $and: [
            {
                name
            },
            {
                account_number
            },
            {
                email
            },
            {
                address
            },
        ]
    }
    if (gender) {
        queryDb.$and.push({ gender })
    }
    if (age) {
        queryDb.$and.push({ age })
    }
    if (balance) {
        queryDb.$and.push({ balance })
    }
    if (col && sort) {
        sortCondition[col] = sort === 'desc' ? -1 : 1
    }
    const accounts = await Accounts.find(queryDb).limit(limit).skip(skip).sort(sortCondition)
    const total = await Accounts.countDocuments(queryDb)
    return {
        accounts,
        skip,
        total,
    }
}

export const addAccount = async (account) => {
    const newAccount = new Accounts(account);
    const acc = await newAccount.save()
    if (!acc) {
        return false
    }
    return true
}

export const editAccount = async (id, account) => {
    const acc = await Accounts.updateOne({ _id: id }, account, { upsert: true });
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

export const getAccountById = async (query) => {
    const acc = await Accounts.findOne(query);
    if (!acc) {
        return false
    }
    return acc
}