const RechargeControllers = require("../controllers/recharge.controller");
const AuthMiddlewares = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.post('/create', AuthMiddlewares.verifyToken, AuthMiddlewares.adminRole, RechargeControllers.create)
router.put('/:id', AuthMiddlewares.verifyToken, AuthMiddlewares.adminRole, RechargeControllers.update)
router.get('/info/:id', AuthMiddlewares.verifyToken, RechargeControllers.getOne)
router.get('/all', AuthMiddlewares.verifyToken, RechargeControllers.getAll)
router.delete('/:id', AuthMiddlewares.verifyToken, RechargeControllers.delete)

module.exports = router;