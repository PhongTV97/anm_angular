export class Account {
    _id: string;
    name: string;
    email: string;
    address: string;
    age: number;
    gender: string;
    balance: number;
    account_number: string;
    phone_number: string;
    constructor() {
        this.name = '';
        this.email = '';
        this.address = '';
        this.age = 1;
        this.gender = '1';
        this.balance = 0;
        this.account_number = '';
        this.phone_number = '';
    }
}