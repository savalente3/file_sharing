'use strict'

/* MODULE IMPORTS */
const table = require('../TablesDatabase.js')
const sqlite = require('sqlite-async')
const maxLenght = 20
const minLenght = 8

module.exports = class Validator {
	constructor(dbName = ':memory:') {
		return (async() => {
			this.db = await sqlite.open(dbName)
			// we need this table to store the user accounts
			await this.db.run(table.createUserTable())
			return this
		})()

	}

 	async userVal(user) {
		try{
 			if (user.length === 0) throw new Error('Missing username.')
 			if (user.length >= maxLenght) throw new Error('Username too long. Must be less than 20 characters.')
		} catch(err) {
			throw err
		}
	}

 	// eslint-disable-next-line complexity
 	async emailVal(email) {
		const atPos = email.indexOf('@')
		const dotPos = email.lastIndexOf('.')
		try {
			if(email.length === 0) {
				throw new Error('Missing email.')
			}
			if(atPos < 1 && dotPos - atPos < 2) {
				throw new Error('That is not the format of an email address.')
			}
		} catch(err) {
			throw err
		}
 	}

 	async passVal(pass) {
		try {
			if(pass.length === 0) throw new Error('Missing password.')
			if(pass.length > maxLenght) throw new Error('The password needs to have between 8 and 20 characters.')
			if(pass.length < minLenght) throw new Error('The password needs to have between 8 and 20 characters.')
		} catch(err) {
			throw err
		}
 	}

}

