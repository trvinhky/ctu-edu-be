const express = require('express')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerOptions = require('./config/swagger');
const corsOptions = require('./config/cors');
const session = require('express-session');

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
    } // 1 phút
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

/* router */
app.use('/account', require('./routes/account.route'))
app.use('/profile', require('./routes/profile.route'))
app.use('/role', require('./routes/role.route'))

app.use('/subject', require('./routes/subject.route'))
app.use('/course', require('./routes/course.route'))
app.use('/enrollment', require('./routes/enrollment.route'))

app.use('/resource', require('./routes/resource.route'))
app.use('/lesson', require('./routes/lesson.route'))
app.use('/category', require('./routes/category.route'))
app.use('/buy', require('./routes/buy.route'))

app.use('/type', require('./routes/type.route'))
app.use('/exam', require('./routes/exam.route'))
app.use('/question', require('./routes/question.route'))
app.use('/question-exam', require('./routes/question_exam.route'))
app.use('/question-resource', require('./routes/question_resource.route'))
app.use('/option', require('./routes/option.route'))
app.use('/answer', require('./routes/answer.route'))
app.use('/result', require('./routes/result.route'))
app.use('/status', require('./routes/status.route'))

app.use('/discussion', require('./routes/discussion.route'))
app.use('/comment', require('./routes/comment.route'))
app.use('/review', require('./routes/review.route'))
app.use('/post', require('./routes/post.route'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

module.exports = app

