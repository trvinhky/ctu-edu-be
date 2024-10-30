const DocumentControllers = require("../controllers/document.controller");
const AuthMiddlewares = require("../middlewares/auth.middleware");
const { upload } = require("../utils/lib/actionsFile");

const router = require("express").Router();

router.post('/create', AuthMiddlewares.verifyToken, AuthMiddlewares.adminRole, upload.single('file'), DocumentControllers.create)
router.put('/:id', AuthMiddlewares.verifyToken, AuthMiddlewares.adminRole, upload.single('file'), DocumentControllers.update)
router.get('/info/:id', DocumentControllers.getOne)
router.get('/all', DocumentControllers.getAll)
router.delete('/:id', AuthMiddlewares.verifyToken, AuthMiddlewares.adminRole, DocumentControllers.delete)

module.exports = router;