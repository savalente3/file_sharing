'use strict'

const sqlite = require('sqlite-async')
const table = require('../TablesDatabase.js')
const fs = require('fs-extra')
const mime = require('mime-types')

module.exports = class Upload {
	constructor(dbName = ':memory:') {
		return (async() => {
			this.db = await sqlite.open(dbName)
			await this.db.run(table.createFileTable())
			return this
		})()
	}

	async testUser() {
		await this.db.run(table.createUserTable())
		const sql = `INSERT INTO users(username, email, pass)
		VALUES("test", "sofiacirne12@gmail.com", "666666666")`
		await this.db.run(sql)
	}

	async getSenderEmailWithUsername(username) {
		const sql1 = `SELECT email FROM users WHERE username = "${username}";`
		this.senderEmail = await this.db.get(sql1)
		if(this.senderEmail === undefined) throw new Error('Inexistent user.')
		return this.senderEmail
	}

	async uploadFiles(path, mimeType, fileName) {
		try {
			const extension = mime.extension(mimeType)
			this.filepath = `private/${extension}/${fileName}`
			this.fileName = fileName
			await fs.copy(path, this.filepath)
		} catch (err) {
			throw err
		}
	}

	// uploads a file with the email of the receiver
	//gets email of receiver from form input and inserts it into database  with the
	//username of the sender, file path and file name
	async sendFileWithReceiverEmail(ReceiverEmail) {
		try {
			const sql = `INSERT INTO files(receiverEmail, senderEmail, filePath, fileName)
			VALUES("${ReceiverEmail}", "${this.senderEmail.email}", "${this.filepath}", "${this.fileName}")`
			await this.db.get(sql)
			return this.filepath
		} catch (err) {
			throw err
		}
	}

	// uploads a file with the username of the receiver
	// gets email of receiver with the user name and inserts into database the email with the
	// username of the sender, file path and file name
	async sendFileWithReceiverUsername(ReceiverUsername) {
		try {
			const sql1 = `SELECT email FROM users WHERE username = "${ReceiverUsername}";`
			const ReceiverEmail = await this.db.get(sql1)
			console.log(`${this.filepath}sofia`)
			console.log(this.senderEmail.email)
			const sql = `INSERT INTO files(receiverEmail, senderEmail, filePath, fileName)
			VALUES("${ReceiverEmail.email}", "${this.senderEmail.email}", "${this.filepath}", "${this.fileName}")`
			await this.db.get(sql)
			return ReceiverEmail.email
		} catch (err) {
			throw err
		}
	}
}
