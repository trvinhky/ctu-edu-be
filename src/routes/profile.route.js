const ProfileControllers = require("../controllers/profile.controller");
const AuthMiddlewares = require("../middlewares/auth.middleware");
const { upload } = require("../utils/lib/actionsFile");

const router = require("express").Router();

router.get('/:id', AuthMiddlewares.verifyToken, ProfileControllers.getOne)
router.put('/edit/:id', AuthMiddlewares.verifyToken, upload.single('file'), ProfileControllers.update)
router.put('/recharge/:id', AuthMiddlewares.verifyToken, ProfileControllers.recharge)

module.exports = router;