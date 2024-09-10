const EnrollmentControllers = require("../controllers/enrollment.controller");
const AuthMiddlewares = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.post('/create', AuthMiddlewares.verifyToken, EnrollmentControllers.create)
router.get('/all', AuthMiddlewares.verifyToken, EnrollmentControllers.getAll)

module.exports = router;