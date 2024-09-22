const FileControllers = require("../controllers/file.controller");
const AuthMiddlewares = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.get('/download/:filename', AuthMiddlewares.verifyToken, FileControllers.download)

module.exports = router;