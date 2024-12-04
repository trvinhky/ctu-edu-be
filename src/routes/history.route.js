const HistoryControllers = require("../controllers/history.controller");
const AuthMiddlewares = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.post('/create', AuthMiddlewares.verifyToken, HistoryControllers.create)
router.get('/all', AuthMiddlewares.verifyToken, HistoryControllers.getAll)
router.get('/total', AuthMiddlewares.verifyToken, HistoryControllers.getTotalMoney)
router.get('/check/:order', AuthMiddlewares.verifyToken, HistoryControllers.checkStatus)
router.post('/callback', HistoryControllers.changeScoreAccount)

module.exports = router;