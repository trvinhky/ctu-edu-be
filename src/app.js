const express = require('express')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerOptions = require('./config/swagger');
const corsOptions = require('./config/cors');
const session = require('express-session');
const path = require('path');

const app = express()
const specs = swaggerJsdoc(swaggerOptions)

app.use(cors(corsOptions))
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
    res.error = (code, message) => {
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
app.use('/profile', require('./routes/profile.route'))
app.use('/role', require('./routes/role.route'))

app.use('/subject', require('./routes/subject.route'))
app.use('/course', require('./routes/course.route'))
app.use('/enrollment', require('./routes/enrollment.route'))

app.use('/recharge', require('./routes/recharge.route'))

app.use('/lesson', require('./routes/lesson.route'))
app.use('/category', require('./routes/category.route'))
app.use('/buy', require('./routes/buy.route'))

app.use('/type', require('./routes/type.route'))
app.use('/exam', require('./routes/exam.route'))
app.use('/question', require('./routes/question.route'))
app.use('/question-exam', require('./routes/question_exam.route'))
app.use('/option', require('./routes/option.route'))
app.use('/answer', require('./routes/answer.route'))
app.use('/result', require('./routes/result.route'))
app.use('/status', require('./routes/status.route'))

app.use('/discussion', require('./routes/discussion.route'))
app.use('/comment', require('./routes/comment.route'))
app.use('/post', require('./routes/post.route'))

app.use('/file', require('./routes/file.route'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

module.exports = app

