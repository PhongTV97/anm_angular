import User from './users';
import Account from './accounts';
var url = 'mongodb://localhost:27017/anm_test_db';
import mongoose from 'mongoose';

// Connection URL
mongoose.connect(url, {
    useNewUrlParser: true
}).then(() => {
    console.log('Connect database success!');
}).catch(
    err => {
        console.log('Connect database fail!', err);
        process.exit();
    }
)

export {
    User,
    Account,
}