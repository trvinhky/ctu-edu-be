const StatusControllers = require("../controllers/status.controller");
const AuthMiddlewares = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.post('/create', AuthMiddlewares.verifyToken, AuthMiddlewares.adminRole, StatusControllers.create)
router.get('/info/:id', AuthMiddlewares.verifyToken, StatusControllers.getOne)
router.get('/all', AuthMiddlewares.verifyToken, StatusControllers.getAll)

module.exports = router;