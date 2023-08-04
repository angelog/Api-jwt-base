var express = require("express")
var app = express();
var router = express.Router();
var HomeController = require("../controllers/HomeController");
var UserController = require("../controllers/user/UserController");

router.get('/', HomeController.index);
router.get('/users', UserController.findAll);
router.post('/user', UserController.create)
module.exports = router;