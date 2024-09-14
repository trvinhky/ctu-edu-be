const QuestionResourceControllers = require("../controllers/question_resource.controller");
const AuthMiddlewares = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.post('/create', AuthMiddlewares.verifyToken, AuthMiddlewares.otherUser, QuestionResourceControllers.create)
router.put('/:id', AuthMiddlewares.verifyToken, AuthMiddlewares.otherUser, QuestionResourceControllers.update)
router.get('/info/:id', QuestionResourceControllers.getOne)
router.get('/all', QuestionResourceControllers.getAll)
router.delete('/:id', AuthMiddlewares.verifyToken, AuthMiddlewares.otherUser, QuestionResourceControllers.delete)

module.exports = router;