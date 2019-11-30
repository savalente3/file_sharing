/**
 * This is the filesUpload module
 * @requires "sqllite-async"
 * @requires "../TablesDatabase.js"
 * @requires "fs-extra"
 * @requires "mime-types"
 */

'use strict'

const sqlite = require('sqlite-async')
const table = require('../TablesDatabase.js')
const fs = require('fs-extra')
const mime = require('mime-types')

module.exports = class Upload {
	/**
	 * Creates an instance of Upload
	 * @param {*} dbName - the name of the database
	 */
	constructor(dbName = ':memory:') {
		return (async() => {
			this.db = await sqlite.open(dbName)
			await this.db.run(table.createFileTable())
			return this
		})()
	}

	/**
	 * testUser function
	 * @async
	 */
	async testUser() {
		await this.db.run(table.createUserTable())
		const sql = `INSERT INTO users(username, email, pass)
		VALUES("test", "sofiacirne12@gmail.com", "666666666")`
		await this.db.run(sql)
	}

	/**
	 * getSenderEmailWithUsername function, fetches the email address of an inputted user from a database
	 * @param {*} username 
	 * @async
	 */
	async getSenderEmailWithUsername(username) {
		const sql1 = `SELECT email FROM users WHERE username = "${username}";`
		this.senderEmail = await this.db.get(sql1)
		if(this.senderEmail === undefined) throw new Error('Inexistent user.')
		return this.senderEmail
	}

	/**
	 * uploadFiles function copies a file to it's private file path.
	 * @param {*} path 
	 * @param {*} mimeType 
	 * @param {*} fileName 
	 * @async
	 */
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

	/**
	 * sendFileWithReceiverEmail function uploads a file with the email of the receiver and inserts into the database the file name, recipient email and file path.
	 * @param {*} ReceiverEmail 
	 * @async
	 */
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
	/**
	 * sendFileWithReceiverUsername function uploads a file with the username of the recipient. Uses username to fetch recipient email. Inserts file name, file path and recipient email into Database
	 * @param {*} ReceiverUsername 
	 * @async
	 */
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
