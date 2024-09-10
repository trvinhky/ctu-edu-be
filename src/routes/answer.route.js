const AnswerControllers = require("../controllers/answer.controller");
const AuthMiddlewares = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.post('/create', AuthMiddlewares.verifyToken, AnswerControllers.create)
router.put('/:id', AuthMiddlewares.verifyToken, AnswerControllers.update)
router.get('/all', AuthMiddlewares.verifyToken, AnswerControllers.getAll)

module.exports = router;