const ResourceControllers = require("../controllers/resource.controller");
const AuthMiddlewares = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.post('/create', AuthMiddlewares.verifyToken, AuthMiddlewares.teacherRole, ResourceControllers.create)
router.get('/info/:id', AuthMiddlewares.verifyToken, ResourceControllers.getOne)
router.put(':id', AuthMiddlewares.verifyToken, AuthMiddlewares.teacherRole, ResourceControllers.update)
router.get('/all', AuthMiddlewares.verifyToken, ResourceControllers.getAll)

module.exports = router;