const CommentControllers = require("../controllers/comment.controller");
const AuthMiddlewares = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.post('/create', AuthMiddlewares.verifyToken, CommentControllers.create)
router.put('/:id', AuthMiddlewares.verifyToken, CommentControllers.update)
router.get('/info/:id', CommentControllers.getOne)
router.get('/all', CommentControllers.getAll)

module.exports = router;