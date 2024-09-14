const RoleControllers = require("../controllers/role.controller");
const AuthMiddlewares = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.post('/create', AuthMiddlewares.verifyToken, AuthMiddlewares.adminRole, RoleControllers.create)
router.get('/info/:id', AuthMiddlewares.verifyToken, AuthMiddlewares.adminRole, RoleControllers.getOne)
router.get('/name/:name', AuthMiddlewares.verifyToken, AuthMiddlewares.adminRole, RoleControllers.getByName)
router.get('/all', AuthMiddlewares.verifyToken, AuthMiddlewares.adminRole, RoleControllers.getAll)
router.put('/:id', AuthMiddlewares.verifyToken, AuthMiddlewares.adminRole, RoleControllers.update)

module.exports = router;