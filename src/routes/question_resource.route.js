const QuestionResourceControllers = require("../controllers/question_resource.controller");
const AuthMiddlewares = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.post('/create', AuthMiddlewares.verifyToken, AuthMiddlewares.otherUser, QuestionResourceControllers.create)
router.put('/:id', AuthMiddlewares.verifyToken, AuthMiddlewares.otherUser, QuestionResourceControllers.update)
router.get('/info/:id', AuthMiddlewares.verifyToken, QuestionResourceControllers.getOne)
router.get('/all', AuthMiddlewares.verifyToken, QuestionResourceControllers.getAll)
router.delete('/:id', AuthMiddlewares.verifyToken, AuthMiddlewares.otherUser, QuestionResourceControllers.delete)

module.exports = router;