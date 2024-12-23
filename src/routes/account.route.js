const AccountControllers = require("../controllers/account.controller");
const AuthMiddlewares = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.post('/create', AccountControllers.create)
router.post('/code', AccountControllers.sendEmailCode)
router.get('/captcha', AccountControllers.getCaptCha)
router.post('/login', AccountControllers.login)
router.get('/token', AccountControllers.updateAccessToken)
router.delete('/logout', AuthMiddlewares.verifyToken, AccountControllers.logout)
router.put('/password', AuthMiddlewares.verifyToken, AccountControllers.changePassword)
router.put('/change-name', AuthMiddlewares.verifyToken, AccountControllers.changeName)
router.put('/change-score', AuthMiddlewares.verifyToken, AuthMiddlewares.adminRole, AccountControllers.changeScore)
router.put('/forgot', AccountControllers.changePassword)
router.get('/info', AuthMiddlewares.verifyToken, AccountControllers.getOne)
router.post('/email', AccountControllers.getOneByEmail)
router.get('/all', AuthMiddlewares.verifyToken, AuthMiddlewares.adminRole, AccountControllers.getAll)
router.put('/update', AuthMiddlewares.verifyToken, AuthMiddlewares.adminRole, AccountControllers.update)

module.exports = router;
