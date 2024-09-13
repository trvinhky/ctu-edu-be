const SubjectControllers = require("../controllers/subject.controller");
const AuthMiddlewares = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.post('/create', AuthMiddlewares.verifyToken, AuthMiddlewares.otherUser, SubjectControllers.create)
router.put('/:id', AuthMiddlewares.verifyToken, AuthMiddlewares.otherUser, SubjectControllers.update)
router.get('/info/:id', SubjectControllers.getOne)
router.get('/all', SubjectControllers.getAll)

module.exports = router;