const QuestionExamControllers = require("../controllers/question_exam.controller");
const AuthMiddlewares = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.post('/create', AuthMiddlewares.verifyToken, AuthMiddlewares.otherUser, QuestionExamControllers.create)
router.get('/all', QuestionExamControllers.getAll)
router.delete('/delete', AuthMiddlewares.verifyToken, AuthMiddlewares.otherUser, QuestionExamControllers.delete)

module.exports = router;