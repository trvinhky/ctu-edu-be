const BuyControllers = require("../controllers/buy.controller");
const AuthMiddlewares = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.post('/create', AuthMiddlewares.verifyToken, BuyControllers.create)
router.get('/all', BuyControllers.getAll)
router.get('/info', BuyControllers.getOne)

module.exports = router;