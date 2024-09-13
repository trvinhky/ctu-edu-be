const ResourceControllers = require("../controllers/resource.controller");
const AuthMiddlewares = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.post('/create', AuthMiddlewares.verifyToken, AuthMiddlewares.otherUser, ResourceControllers.create)
router.get('/info/:id', AuthMiddlewares.verifyToken, ResourceControllers.getOne)
router.put('/:id', AuthMiddlewares.verifyToken, AuthMiddlewares.otherUser, ResourceControllers.update)
router.delete('/:id', AuthMiddlewares.verifyToken, AuthMiddlewares.otherUser, ResourceControllers.delete)
router.get('/all', AuthMiddlewares.verifyToken, ResourceControllers.getAll)

module.exports = router;