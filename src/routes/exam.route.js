const ExamControllers = require("../controllers/exam.controller");
const AuthMiddlewares = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.post('/create', AuthMiddlewares.verifyToken, AuthMiddlewares.otherUser, ExamControllers.create)
router.put('/:id', AuthMiddlewares.verifyToken, AuthMiddlewares.otherUser, ExamControllers.update)
router.get('/info/:id', ExamControllers.getOne)
router.get('/all', ExamControllers.getAll)
router.delete('/:id', AuthMiddlewares.verifyToken, AuthMiddlewares.otherUser, ExamControllers.delete)

module.exports = router;