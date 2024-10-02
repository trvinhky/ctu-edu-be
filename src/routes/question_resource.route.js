const QuestionResourceControllers = require("../controllers/question_resource.controller");
const AuthMiddlewares = require("../middlewares/auth.middleware");
const { upload } = require("../utils/lib/actionsFile");

const router = require("express").Router();

router.post('/create', AuthMiddlewares.verifyToken, AuthMiddlewares.otherUser, upload.single('file'), QuestionResourceControllers.create)
router.get('/info/:id', QuestionResourceControllers.getOne)
router.get('/all', QuestionResourceControllers.getAll)
router.delete('/:id', AuthMiddlewares.verifyToken, AuthMiddlewares.otherUser, QuestionResourceControllers.delete)

module.exports = router;