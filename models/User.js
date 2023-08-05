var knex = require('../database/connection');
var bcrypt = require('bcrypt');

class User{

    async create(email, password, name){

        try {
            const pass = await bcrypt.hash(password, 10);
            await knex.insert({email, password: pass, name, role: 0}).table("Users");
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    
    async findAll() {
        try {
            return await knex.select(["id", "name", "email", "role"]).table("Users")
        } catch (error) {
            return [];
        }
    }
    
    async findByEmail(email) {

        try {
            const result = await knex.select("*").from("Users").where({email: email});
            if (result.length > 0) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async findById(id) {
        try {
            const result = await knex.select(["id", "name", "email", "role"]).table("Users").where({id: id});
            if (result.length > 0) {
                return result[0];
            } else {
                return undefined;
            }
        } catch (error) {
            return [];
        }
    }

    async findByName(name) {
        try {
            const result = await knex.select(["id", "name", "email", "role"]).table("Users").where({name: name});
            if (result.length > 0) {
                return result[0];
            } else {
                return undefined;
            }
        } catch (error) {
            return [];
        }
    }

    async update(id, email, name, role) {
        if ([id, email, name, role].includes(undefined)) {
            return {status: false, error: 'Invalid data user'}
        }
        const user = await this.findById(id);

        if (user != undefined) {
            if (email != user.email) {
                var result = await this.findByEmail(email);
                if (result){
                    return { status: false, error: 'email already in use' };
                }

                try {
                    await knex
                    .update({email: email, name: name, role: role})
                    .where({id: id})
                    .table('Users');
                    return {status: true};
                } catch (error) {
                    return{status: false};
                }

            }
        } else {
            return {status: false, error: 'User not found'};
        }
    }

    async delete(id) {
        const user = await this.findById(id);
        if (user != undefined) {
            try {
                await knex.delete().where({id: id}).table("Users");
                return {status: true, user};
            } catch (error) {
                return {status: false, error: error};
            }
        } else {
            return {status: false, error: 'User not found'};
        }
    }

}

module.exports = new User();