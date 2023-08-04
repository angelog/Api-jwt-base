var User = require('../../models/User');

class UserController{
    async findUser(req, res){
        const id = req.body.id
        const result = await User.findById(id);
        if (result) {
            res.status(200).json({user: result});
        } else {
            res.status(404).json({user: undefined});
        }
    }

    async create(req, res){
        var {email, name, password} = req.body;
        if ([email, password].includes(undefined)){
            res.status(400).json({error:"email and password is required"});
            return;
        }
        
        const status = await User.findByEmail(email);
        if(status) {
            res.status(200).send({error:"E-mail already exists"})
            return;
        }
        await User.create(email, password, name);

        res.status(200).send('Pegando o corpo da requisição!');
    }

    async findAll(req, res) {
        const result = await User.findAll();
        res.status(200).json(result);
    }
}

module.exports = new UserController()