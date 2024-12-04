const FormatControllers = require("../controllers/format.controller");
const AuthMiddlewares = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.post('/create', AuthMiddlewares.verifyToken, AuthMiddlewares.adminRole, FormatControllers.create)
router.get('/info/:id', FormatControllers.getOne)
router.get('/all', FormatControllers.getAll)
router.put('/:id', AuthMiddlewares.verifyToken, AuthMiddlewares.adminRole, FormatControllers.update)

module.exports = router;