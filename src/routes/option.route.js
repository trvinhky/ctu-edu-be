const OptionControllers = require("../controllers/option.controller");
const AuthMiddlewares = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.post('/create', AuthMiddlewares.verifyToken, AuthMiddlewares.otherUser, OptionControllers.create)
router.put('/:id', AuthMiddlewares.verifyToken, AuthMiddlewares.otherUser, OptionControllers.update)
router.get('/info/:id', AuthMiddlewares.verifyToken, OptionControllers.getOne)
router.get('/by', AuthMiddlewares.verifyToken, OptionControllers.getOptionByQuestionId)
router.get('/all', AuthMiddlewares.verifyToken, OptionControllers.getAll)
router.delete('/:id', AuthMiddlewares.verifyToken, AuthMiddlewares.otherUser, OptionControllers.delete)

module.exports = router;