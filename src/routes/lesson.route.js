const LessonControllers = require("../controllers/lesson.controller");
const AuthMiddlewares = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.post('/create', AuthMiddlewares.verifyToken, AuthMiddlewares.teacherRole, LessonControllers.create)
router.put('/:id', AuthMiddlewares.verifyToken, AuthMiddlewares.teacherRole, LessonControllers.update)
router.get('/info/:id', AuthMiddlewares.verifyToken, LessonControllers.getOne)
router.get('/all', AuthMiddlewares.verifyToken, LessonControllers.getAll)
router.delete('/:id', AuthMiddlewares.verifyToken, AuthMiddlewares.teacherRole, LessonControllers.delete)

module.exports = router;