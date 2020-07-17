import mongoose, { Schema } from 'mongoose';
import { lstUser } from '../data/accounts';
import md5 from 'md5';

const userSchema = new Schema({
    user_name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: Number,
        enum: [0, 1],
        default: 0,
    }
})

const User = mongoose.model('users', userSchema)

export default User;

Promise.all(
    lstUser.map(async (item) => {
        const query = { user_name: item.user_name };
        const option = {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true
        }
        const update = { ...item, password: md5(item.password) };

        User.findOneAndUpdate(query, update, option, function (err, res) {
        })
    })
)