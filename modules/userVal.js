'use strict'

/* MODULE IMPORTS */
const sql = require('sqlite-async')

module.exports = class Validator {

async userVal(user) {
        if (user.length === 0) throw new Error('Missing username.')

    if (user.lenght >= 20) throw new Error('Username too long. Must be less than 20 characters')

    //Check if there is no other user with the same username
    sql = `SELECT COUNT(id) as records FROM users WHERE user="${user}";`
    const data = await this.db.get(sql)
    if (data.records !== 0) throw new Error(`Username "${user}" already in use.`)
    }

    async emailVal(email) {
        if (email.length === 0) throw new Error('Missing email.')
    }

    async passVal(pass) {
        if (pass.length === 0) throw new Error('Missing password.')
    }

}