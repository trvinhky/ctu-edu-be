const CourseControllers = require("../controllers/course.controller");
const AuthMiddlewares = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.post('/create', AuthMiddlewares.verifyToken, AuthMiddlewares.teacherRole, CourseControllers.create)
router.put('/:id', AuthMiddlewares.verifyToken, AuthMiddlewares.teacherRole, CourseControllers.update)
router.get('/info/:id', CourseControllers.getOne)
router.get('/all', CourseControllers.getAll)

module.exports = router;