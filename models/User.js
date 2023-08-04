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

    async findByName(name) {}

}

module.exports = new User();