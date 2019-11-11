'use strict'

const bcrypt = require('bcrypt-promise')
const fs = require('fs-extra')
const mime = require('mime-types')
const sqlite = require('sqlite-async')
const saltRounds = 10

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

	async register(username, email, pass) {
		try {
			pass = await bcrypt.hash(pass, saltRounds)
			const sql = `INSERT INTO users(username, email, pass) VALUES("${username}", "${email}", "${pass}")`
			await this.db.run(sql)
			console.log(sql)
			return true
		} catch(err) {
			throw err
		}
	}

	async uploadPicture(path, mimeType, username) {
		const extension = mime.extension(mimeType)
		await fs.copy(path, `public/avatars/${username}.${extension}`)
	}

	async login(username, password) {
		try {
			let sql = `SELECT count(id) AS count FROM users WHERE username="${username}";`
			const records = await this.db.get(sql)
			if(!records.count) throw new Error(`user "${username}" not found`)
			sql = `SELECT pass FROM users WHERE username = "${username}";`
			const record = await this.db.get(sql)
			const valid = await bcrypt.compare(password, record.pass)
			if(valid === false) throw new Error(`invalid password for account "${username}"`)
			return true
		} catch(err) {
			throw err
		}
	}
}