const DiscussionControllers = require("../controllers/discussion.controller");
const AuthMiddlewares = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.post('/create', AuthMiddlewares.verifyToken, DiscussionControllers.create)
router.put('/:id', AuthMiddlewares.verifyToken, DiscussionControllers.update)
router.get('/info/:id', DiscussionControllers.getOne)
router.get('/all', DiscussionControllers.getAll)

module.exports = router;