const FormatControllers = require("../controllers/format.controller");
const AuthMiddlewares = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.post('/create', AuthMiddlewares.verifyToken, AuthMiddlewares.adminRole, FormatControllers.create)
router.get('/info/:id', AuthMiddlewares.verifyToken, AuthMiddlewares.adminRole, FormatControllers.getOne)
router.get('/all', AuthMiddlewares.verifyToken, AuthMiddlewares.adminRole, FormatControllers.getAll)
router.put('/:id', AuthMiddlewares.verifyToken, AuthMiddlewares.adminRole, FormatControllers.update)

module.exports = router;