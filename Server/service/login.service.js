import Users from './../models/users';

export const getUser = async (query) => {
    let user = await Users.findOne(query);
    return user
}
