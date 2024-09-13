const PostControllers = require("../controllers/post.controller");
const AuthMiddlewares = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.post('/create', AuthMiddlewares.verifyToken, PostControllers.create)
router.put('/auth/:id', AuthMiddlewares.verifyToken, PostControllers.update)
router.put('/status/:id', AuthMiddlewares.verifyToken, AuthMiddlewares.adminRole, PostControllers.updateStatus)
router.get('/info/:id', AuthMiddlewares.verifyToken, PostControllers.getOne)
router.get('/all', AuthMiddlewares.verifyToken, PostControllers.getAll)
router.delete('/delete', AuthMiddlewares.verifyToken, PostControllers.delete)

module.exports = router;