const QuestionControllers = require("../controllers/question.controller");
const AuthMiddlewares = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.post('/create', AuthMiddlewares.verifyToken, AuthMiddlewares.otherUser, QuestionControllers.create)
router.put('/:id', AuthMiddlewares.verifyToken, AuthMiddlewares.otherUser, QuestionControllers.update)
router.get('/info/:id', QuestionControllers.getOne)
router.get('/all', QuestionControllers.getAll)
router.delete('/:id', AuthMiddlewares.verifyToken, AuthMiddlewares.otherUser, QuestionControllers.delete)

module.exports = router;