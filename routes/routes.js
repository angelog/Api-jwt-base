var {Router} = require("express")
var router = Router();
var HomeController = require("../controllers/HomeController");
var UserController = require("../controllers/user/UserController");

router.get('/', HomeController.index);
router.post('/users', UserController.create)
router.get('/users', UserController.findAll);
router.get('/users/:id', UserController.findUser);
router.put('/users', UserController.edit);
router.delete('/users/:id', UserController.delete);
module.exports = router;