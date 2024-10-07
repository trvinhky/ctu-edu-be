const FileControllers = require("../controllers/file.controller");
const AuthMiddlewares = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.get('/download/:filename', AuthMiddlewares.verifyToken, FileControllers.download)
router.post('/read-pdf', FileControllers.readFilePDF)

module.exports = router;