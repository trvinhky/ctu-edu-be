const QuestionExamControllers = require("../controllers/question_exam.controller");
const AuthMiddlewares = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.post('/create', AuthMiddlewares.verifyToken, AuthMiddlewares.teacherRole, QuestionExamControllers.create)
router.put('/update', AuthMiddlewares.verifyToken, AuthMiddlewares.teacherRole, QuestionExamControllers.update)
router.get('/all', AuthMiddlewares.verifyToken, QuestionExamControllers.getAll)
router.delete('/delete', AuthMiddlewares.verifyToken, AuthMiddlewares.teacherRole, QuestionExamControllers.delete)

module.exports = router;