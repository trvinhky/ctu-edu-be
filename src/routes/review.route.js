const ReviewControllers = require("../controllers/review.controller");
const AuthMiddlewares = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.post('/create', AuthMiddlewares.verifyToken, ReviewControllers.create)
router.get('/info/:id', ReviewControllers.getOne)
router.get('/all', ReviewControllers.getAll)

module.exports = router;