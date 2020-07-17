import { getUser } from '../service/login.service';
import md5 from 'md5';
import { message, constants } from './../helpers/constant';
import jwt from 'jsonwebtoken';

export const loginController = async (req, res) => {
    try {
        let user_name = req.body.user_name
        let password = req.body.password
        const user = await getUser({ user_name: user_name, password: md5(password) })
        if (!user) {
            return res.json({
                result: false,
                message: message.MSG001,
            })
        }
        const token = await jwt.sign({ _id: user._id, user_name: user.user_name, role: user.role }, constants.SECRET_KEY);
        return res.json({
            result: true,
            user,
            token
        })
    } catch (error) {
        console.log(error)
        return res.json({ result: false, message: message.MSG002, status: 0 })
    }
}