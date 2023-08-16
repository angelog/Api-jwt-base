const knex = require('../database/Connection');
const User = require('./User');

class PasswordToken {
    async create(email) {
        const user = await User.findByEmail(email);
        if (user) {
            const token = Date.now() // TODO: update token key UUID
            await knex.insert({
                user_id: user.id,
                token: token
            }).table("PasswordTokens");
            return {status: true, token: token}
        } else {
            return {status: false, error: "The email address not exist."};
        }
    }
}


module.exports = new PasswordToken()