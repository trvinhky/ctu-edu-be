const AccountControllers = require("../controllers/account.controller");
const AuthMiddlewares = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.post('/create', AccountControllers.create)
router.post('/login', AccountControllers.login)
router.get('/token', AccountControllers.updateAccessToken)
router.delete('/logout', AuthMiddlewares.verifyToken, AccountControllers.logout)
router.get('/info', AuthMiddlewares.verifyToken, AccountControllers.getOne)
router.get('/all', AuthMiddlewares.verifyToken, AuthMiddlewares.adminRole, AccountControllers.getAll)

module.exports = router;
