const ProfileControllers = require("../controllers/profile.controller");
const AuthMiddlewares = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.get('/:id', AuthMiddlewares.verifyToken, ProfileControllers.getOne)
router.put('/:id', AuthMiddlewares.verifyToken, ProfileControllers.update)
router.put('/recharge/:id', AuthMiddlewares.verifyToken, ProfileControllers.recharge)

module.exports = router;