const message = {
    MSG0000: 'Error System!',
    MSG001: 'Username or Password Wrong!',
    MSG002: 'Error!',
    MSG003: 'Remove Item Fail!',
    MSG004: 'Remove Item Success!',
    MSG005: 'Update Item Fail, Email Existed!',
    MSG006: 'Update Item Fail, Account number Existed!',
    MSG007: 'Update Item Success!',
    MSG008: 'Add Item Fail, Email Existed!',
    MSG009: 'Add Item Fail, Account number Existed!',
    MSG0010: 'Add Item Success!',
    MSG0011: 'Username is required!',
    MSG0012: 'Password is required!',
    MSG0013: 'Email is required!',
    MSG0014: 'Id is required!',
    MSG0015: 'Account number is must required and is less than 13 characters!',
    MSG0016: 'Name is required!',
    MSG0017: 'Age is required!',
    MSG0018: 'Age must be number and greater than 0',
    MSG0019: 'Account number must be number',
    MSG0020: `You do not have access!`,
    MSG0021: `Bank Account is not existed!`,
    MSG0022: 'Gender is required!',
    MSG0023: 'Balance is required!',
    MSG0024: 'Balance must be number',
}

const constants = {
    DEFAULT_LIMIT: 50,
    DEFAULT_PAGE: 1,
    ROLE_ADMIN_NORMAL: [0, 1],
    ROLE_ADMIN: [1],
    SECRET_KEY: 'SECRET_KEY'
}

export {
    message,
    constants
}
