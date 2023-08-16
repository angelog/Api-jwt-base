var {Router} = require("express")
var router = Router();
var HomeController = require("../controllers/HomeController");
var UserController = require("../controllers/user/UserController");
var AdminAuth = require("../middleware/AdminAuth")


router.get('/', HomeController.index);
router.post('/users', AdminAuth, UserController.create)
router.get('/users', AdminAuth, UserController.findAll);
router.get('/users/:id', AdminAuth, UserController.findUser);
router.put('/users', AdminAuth, UserController.edit);
router.delete('/users/:id', AdminAuth, UserController.delete);
router.post('/users/rescoverpassword', UserController.recoverPassord);
router.post('/users/login', UserController.login);
module.exports = router;