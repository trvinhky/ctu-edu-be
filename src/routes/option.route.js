const OptionControllers = require("../controllers/option.controller");
const AuthMiddlewares = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.post('/create', AuthMiddlewares.verifyToken, AuthMiddlewares.teacherRole, OptionControllers.create)
router.put('/:id', AuthMiddlewares.verifyToken, AuthMiddlewares.teacherRole, OptionControllers.update)
router.get('/info/:id', AuthMiddlewares.verifyToken, OptionControllers.getOne)
router.get('/all', AuthMiddlewares.verifyToken, OptionControllers.getAll)
router.delete('/:id', AuthMiddlewares.verifyToken, AuthMiddlewares.teacherRole, OptionControllers.delete)

module.exports = router;