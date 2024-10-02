const ResourceControllers = require("../controllers/resource.controller");
const AuthMiddlewares = require("../middlewares/auth.middleware");
const { upload } = require("../utils/lib/actionsFile");

const router = require("express").Router();

router.post('/create', AuthMiddlewares.verifyToken, AuthMiddlewares.otherUser, upload.single('file'), ResourceControllers.create)
router.get('/info/:id', ResourceControllers.getOne)
router.delete('/:id', AuthMiddlewares.verifyToken, AuthMiddlewares.otherUser, ResourceControllers.delete)
router.get('/all', ResourceControllers.getAll)

module.exports = router;