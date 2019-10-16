const db = require('../data/dbClient')
const bcrypt = require('bcrypt')

module.exports = (function usersModel() {
    function all() {
        return db('users')
    }

    function findByUsername(username) {
        return db('users')
            .where({username})
            .first()
    }

    async function create(user) {
        await db('users').insert(user)
        return findByUsername(user.username)
    } 

    function update(username, changes) {
        if (changes.password) {
            changes.password = bcrypt.hashSync(changes.password, 8)
        }

        await db('users').update(changes)
        return db('users').where({username})
    }

    function remove(username) {
        return db('users').delete().where({username})
    }

    return {
        all, 
        findByUsername,
        create,
        update,
        remove
    }
})()