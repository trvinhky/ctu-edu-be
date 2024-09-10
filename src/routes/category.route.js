const CategoryControllers = require("../controllers/category.controller");
const AuthMiddlewares = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.post('/create', AuthMiddlewares.verifyToken, AuthMiddlewares.adminRole, CategoryControllers.create)
router.get('/info/:id', AuthMiddlewares.verifyToken, AuthMiddlewares.teacherRole, CategoryControllers.getOne)
router.get('/all', AuthMiddlewares.verifyToken, AuthMiddlewares.teacherRole, CategoryControllers.getAll)

module.exports = router;