const TypeControllers = require("../controllers/type.controller");
const AuthMiddlewares = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.post('/create', AuthMiddlewares.verifyToken, AuthMiddlewares.adminRole, TypeControllers.create)
router.get('/info/:id', AuthMiddlewares.verifyToken, AuthMiddlewares.otherUser, TypeControllers.getOne)
router.get('/all', AuthMiddlewares.verifyToken, AuthMiddlewares.otherUser, TypeControllers.getAll)

module.exports = router;