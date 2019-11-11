'use strict'

/* MODULE IMPORTS */
const sqlite = require('sqlite-async')

module.exports = class Validator {
    constructor(dbName = ':memory:') {
		return (async() => {
			this.db = await sqlite.open(dbName)
			// we need this table to store the user accounts
			const sql = 'CREATE TABLE IF NOT EXISTS users' +
			'(id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, email TEXT, pass TEXT);'
			await this.db.run(sql)
			return this
		})()		
		
	}

 	async userVal(user) {
        try{
 		if (user.length === 0) throw new Error('Missing username.')

 		if (user.length >= 20) throw new Error('Username too long. Must be less than 20 characters')

        } catch(err) {
            throw err
        }
    }

 	async emailVal(email) {
 		if(email.length === 0) throw new Error('Missing email.')
 	}

 	async passVal(pass) {
 		if(pass.length === 0) throw new Error('Missing password.')
 	}

 }