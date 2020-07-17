import express from 'express';
let router = express.Router()
import jwt from 'jsonwebtoken';
import { constants } from './../helpers/constant';
import { loginController } from '../controller/login.controller';
import { searchController, removeController, addController, editController, authorFunction } from '../controller/accounts.controller';

router.use(async function (req, res, next) {
    let notVerify = '/login';
    if (!notVerify.includes(req.path)) {
        const token = req.headers.token;
        console.log(token);
        if (token) {
            const data = await jwt.verify(token, constants.SECRET_KEY);
            req.user = data;
            if (data) {
                console.log(data);
                return next();
            }
        }
        return res.json({ result: false, stattus: 401 })
    } else {
        next();
    }
})

router.post('/login', loginController)
router.get('/accounts', authorFunction(constants.ROLE_ADMIN_NORMAL), searchController)
router.delete('/accounts/:id', authorFunction(constants.ROLE_ADMIN), removeController)
router.post('/accounts', authorFunction(constants.ROLE_ADMIN), addController)
router.put('/accounts/:id', authorFunction(constants.ROLE_ADMIN), editController)

export default router;