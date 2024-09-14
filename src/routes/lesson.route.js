const LessonControllers = require("../controllers/lesson.controller");
const AuthMiddlewares = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.post('/create', AuthMiddlewares.verifyToken, AuthMiddlewares.otherUser, LessonControllers.create)
router.put('/:id', AuthMiddlewares.verifyToken, AuthMiddlewares.otherUser, LessonControllers.update)
router.get('/info/:id', LessonControllers.getOne)
router.get('/all', LessonControllers.getAll)
router.delete('/:id', AuthMiddlewares.verifyToken, AuthMiddlewares.otherUser, LessonControllers.delete)

module.exports = router;