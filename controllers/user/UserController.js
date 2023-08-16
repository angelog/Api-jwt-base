const User = require('../../models/User');
const PasswordToken = require('../../models/PasswordToken');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var secret = 'jwttokenaplication';

class UserController{
    async findUser(req, res){
        const id = req.params.id
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

        res.status(200).json({message: 'User created successfully'});
    }

    async findAll(req, res) {
        const result = await User.findAll();
        res.status(200).json(result);
    }

    async edit(req, res) {
        const {id, name, email, role} = req.body;

        const result = await User.update(id, name, email, role);
        if (result.status) {
            res.status(200).json({message: 'User updated successfully'});
        } else {
            res.status(406).json(result);
        }
    }

    async delete(req, res) {
        const {id} = req.params;
        const result = await User.delete(id)
        if (result.status) {
            res.status(200).json({message: `User ${result.user.name} deleted successfully`});
        } else {
            res.status(406).json({error: result.error});
        }
    }

    async recoverPassord(req, res) {
        const {email} = req.body;
        const result = email != undefined 
        ? await PasswordToken.create(email)
        : {status: false}

        if (result.status) {
            res.status(200).json(result)
        } else {
            res.status(406).json({error: result.error ?? 'Email is undefined'})
        }
    }

    async login(req, res) {
        const { email, password } = req.body;

        const user = await User.findByEmail(email);
        if (user != undefined) {
            var result = await bcrypt.compare(password, user.password);
            if (result) {
                var token = jwt.sign({ email: user.email, role: user.role}, secret);
                res.status(200).json({ token: token});
            } else {
                res.status(406).json({message: 'Password is incorrect'})
            }
        } else {
            res.status(500).json({message: 'Internal Server Error'});
        }
    }

}

module.exports = new UserController()