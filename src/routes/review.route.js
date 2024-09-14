const ReviewControllers = require("../controllers/review.controller");
const AuthMiddlewares = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.post('/create', AuthMiddlewares.verifyToken, ReviewControllers.create)
router.put('/:id', AuthMiddlewares.verifyToken, ReviewControllers.update)
router.get('/info/:id', ReviewControllers.getOne)
router.get('/all', ReviewControllers.getAll)
router.delete('/:id', AuthMiddlewares.verifyToken, ReviewControllers.delete)

module.exports = router;