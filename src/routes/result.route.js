const ResultControllers = require("../controllers/result.controller");
const AuthMiddlewares = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.post('/create', AuthMiddlewares.verifyToken, ResultControllers.create)
router.get('/all', AuthMiddlewares.verifyToken, ResultControllers.getAll)

module.exports = router;