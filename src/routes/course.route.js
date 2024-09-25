const CourseControllers = require("../controllers/course.controller");
const AuthMiddlewares = require("../middlewares/auth.middleware");
const { upload } = require("../utils/lib/actionsFile");

const router = require("express").Router();

router.post('/create', AuthMiddlewares.verifyToken, AuthMiddlewares.otherUser, upload.single('file'), CourseControllers.create)
router.put('/:id', AuthMiddlewares.verifyToken, AuthMiddlewares.otherUser, upload.single('file'), CourseControllers.update)
router.get('/info/:id', CourseControllers.getOne)
router.get('/all', CourseControllers.getAll)

module.exports = router;