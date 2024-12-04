const express = require('express')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerOptions = require('./config/swagger');
const corsOptions = require('./config/cors');
const session = require('express-session');
const cookieParser = require('cookie-parser')
const path = require('path');
const dotenv = require('dotenv')

dotenv.config()

const app = express()
const specs = swaggerJsdoc(swaggerOptions)

app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: Number(process.env.SESSION_TIME)
    } // 5 phút
}))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

app.use((err, req, res, next) => {
    if (err.message && err.message.includes('CORS')) {
        res.status(400).send({
            message: 'CORS Error',
            details: err.message
        });
    } else {
        next(err);
    }
});

/* response */
app.use((req, res, next) => {
    res.success = (message, data) => {
        return res.status(201).json({ message, data });
    };
    next();
});

app.use((req, res, next) => {
    res.successNoData = (message) => {
        return res.status(200).json({ message });
    };
    next();
});

app.use((req, res, next) => {
    res.error = (code = 404, message) => {
        return res.status(code).json({ message });
    };
    next();
});

app.use((req, res, next) => {
    res.errorServer = () => {
        return res.error(500, 'Lỗi server!');
    };
    next();
});

app.use((req, res, next) => {
    res.errorValid = (
        message = 'Tất cả trường dữ đều liệu rỗng!'
    ) => {
        return res.error(400, message);
    };
    next();
});

// Server folder 
app.use('/captchas', express.static(path.join(__dirname, 'captchas')))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

/* router */
app.use('/account', require('./routes/account.route'))

app.use('/store', require('./routes/store.route'))
app.use('/recharge', require('./routes/recharge.route'))
app.use('/document', require('./routes/document.route'))
app.use('/format', require('./routes/format.route'))
app.use('/buy', require('./routes/buy.route'))
app.use('/history', require('./routes/history.route'))

app.use('/status', require('./routes/status.route'))
app.use('/post', require('./routes/post.route'))
app.use('/review', require('./routes/review.route'))

app.use('/file', require('./routes/file.route'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

module.exports = app

