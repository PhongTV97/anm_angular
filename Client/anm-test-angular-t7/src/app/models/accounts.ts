export class Account {
    _id: string;
    name: string;
    email: string;
    address: string;
    age: number;
    dob: Date;
    gender: string;
    balance: number;
    account_number: string;
    phone_number: string;
    del_flag: number
    constructor() {
        this.name = '';
        this.email = '';
        this.address = '';
        this.age = 0;
        this.dob = new Date();
        this.gender = '1';
        this.balance = 0;
        this.account_number = '';
        this.phone_number = '';
        this.del_flag = 0;
    }
}