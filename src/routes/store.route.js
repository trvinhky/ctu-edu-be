const StoreControllers = require("../controllers/store.controller");
const AuthMiddlewares = require("../middlewares/auth.middleware");
const { upload } = require("../utils/lib/actionsFile");

const router = require("express").Router();

router.post('/create', AuthMiddlewares.verifyToken, AuthMiddlewares.adminRole, upload.single('file'), StoreControllers.create)
router.put('/:id', AuthMiddlewares.verifyToken, AuthMiddlewares.adminRole, upload.single('file'), StoreControllers.update)
router.get('/info/:id', StoreControllers.getOne)
router.get('/all', StoreControllers.getAll)

module.exports = router;