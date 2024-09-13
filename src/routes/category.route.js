const CategoryControllers = require("../controllers/category.controller");
const AuthMiddlewares = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.post('/create', AuthMiddlewares.verifyToken, AuthMiddlewares.adminRole, CategoryControllers.create)
router.get('/info/:id', AuthMiddlewares.verifyToken, AuthMiddlewares.otherUser, CategoryControllers.getOne)
router.get('/all', AuthMiddlewares.verifyToken, AuthMiddlewares.otherUser, CategoryControllers.getAll)
router.put('/:id', AuthMiddlewares.verifyToken, AuthMiddlewares.otherUser, CategoryControllers.update)

module.exports = router;