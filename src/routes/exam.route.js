const ExamControllers = require("../controllers/exam.controller");
const AuthMiddlewares = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.post('/create', AuthMiddlewares.verifyToken, AuthMiddlewares.teacherRole, ExamControllers.create)
router.put('/:id', AuthMiddlewares.verifyToken, AuthMiddlewares.teacherRole, ExamControllers.update)
router.get('/info/:id', AuthMiddlewares.verifyToken, ExamControllers.getOne)
router.get('/all', AuthMiddlewares.verifyToken, AuthMiddlewares.otherUser, ExamControllers.getAll)
router.delete('/:id', AuthMiddlewares.verifyToken, AuthMiddlewares.teacherRole, ExamControllers.delete)

module.exports = router;