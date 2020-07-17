import express from 'express'
import cors from 'cors';
import './models/index';
import router from './routes/routes';
import createError from 'http-errors';

const app = express();
app.use(express.json());
app.use(cors())
let server = app.listen(3000, function () {
    console.log('server is running with port', server.address().port)
})

app.use('/', router)

app.use(function (req, res, next) {
    next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});



