'use strict'

const bcrypt = require('bcrypt-promise')
const fs = require('fs-extra')
const mime = require('mime-types')
const sqlite = require('sqlite-async')
const saltRounds = 10
const Validator = require('./userVal')
const Download = require('./filesDownload')

module.exports = class User {

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

	async register(user, email, pass) {
		try {
			const valid = await new Validator()
			await valid.passVal(pass)
			await valid.userVal(user)
			await valid.emailVal(email)
			pass = await bcrypt.hash(pass, saltRounds)
			let sql = `SELECT count(id) AS count FROM users WHERE username="${user}";`
			const records = await this.db.get(sql)
			if(records.count !== 0) throw new Error('Username already in use.')
			const lowerEmail = email.toLowerCase()
			sql = `INSERT INTO users(username, email, pass) VALUES("${user}", "${lowerEmail}", "${pass}")`
			await this.db.run(sql)
			return true
		} catch(err) {
			throw err
		}
	}

	async uploadPicture(path, mimeType, user) {
		const extension = mime.extension(mimeType)
		await fs.copy(path, `public/avatars/${user}.${extension}`)
	}

	async login(user, password) {
		try {
			let sql = `SELECT count(id) AS count FROM users WHERE username = "${user}";`
			const records = await this.db.get(sql)
			if(!records.count) throw new Error(`user "${user}" not found`)
			sql = `SELECT pass FROM users WHERE username = "${user}";`
			const record = await this.db.get(sql)
			const valid = await bcrypt.compare(password, record.pass)
			if(valid === false) throw new Error(`invalid password for account "${user}"`)

			return true
		} catch(err) {
			throw err
		}
	}

}
