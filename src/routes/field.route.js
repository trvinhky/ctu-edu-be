const FieldControllers = require("../controllers/field.controller");
const AuthMiddlewares = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.post('/create', AuthMiddlewares.verifyToken, AuthMiddlewares.adminRole, FieldControllers.create)
router.put('/:id', AuthMiddlewares.verifyToken, AuthMiddlewares.adminRole, FieldControllers.update)
router.get('/info/:id', FieldControllers.getOne)
router.get('/all', FieldControllers.getAll)

module.exports = router;