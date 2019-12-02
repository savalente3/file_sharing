/**
 * This is the filesUpload module
 * @requires "sqllite"
 * @requires "table"
 * @requires "fs"
 * @requires "mime"
 */
'use strict'
const sqlite = require('sqlite-async')
const table = require('../TablesDatabase.js')
const fs = require('fs-extra')
const mime = require('mime-types')
const crypto = require('crypto')
module.exports = class Upload {
	/**
	 * Creates an instance of Upload
	 * @constructor
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
	 * inserts into users table a dummy user
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
	 * inserts into files table a dummy file
	 * testUser function
	 * @async
	 */
	async testEmail() {
		await this.db.run(table.createUserTable())
		const sql = `INSERT INTO files(receiverEmail, senderEmail, filePath, fileName)
		VALUES("receiverEmail@gmail.com", "senderEmail@gmail.com", "png/666666666", "666666666")`
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
		const extension = mime.extension(mimeType)
		console.log(extension)
		this.filepath = `${extension}/${fileName}`
		this.fileName = fileName
		await fs.copy(path, this.filepath)
		return true
	}
	/**
	 * sendFileWithReceiverEmail function uploads a file with the email of the receiver and
	 * inserts into the database the file name, recipient email and file path.
	 * @param {*} ReceiverEmail
	 * @async
	 */
	async sendFileWithReceiverEmail(ReceiverEmail) {
		try {
			const sql = `INSERT INTO files(receiverEmail, senderEmail, filePath, fileName)
			VALUES("${ReceiverEmail}", "${this.senderEmail.email}", "${this.filepath}", "${this.fileName}")`
			this.insert = await this.db.get(sql)
			return true
		} catch (err) {
			throw err
		}
	}
	/**
	 * sendFileWithReceiverUsername function uploads a file with the username of the recipient.
	 * Uses username to fetch recipient email. Inserts file name, file path and recipient email into Database
	 * @param {*} ReceiverUsername
	 * @async
	 */
	async sendFileWithReceiverUsername(ReceiverUsername) {
		try {
			const sql1 = `SELECT email FROM users WHERE username = "${ReceiverUsername}";`
			const ReceiverEmail = await this.db.get(sql1)
			const sql = `INSERT INTO files(receiverEmail, senderEmail, filePath, fileName)
			VALUES("${ReceiverEmail.email}", "${this.senderEmail.email}", "${this.filepath}", "${this.fileName}")`
			await this.db.get(sql)
			return ReceiverEmail.email
		} catch (err) {
			throw err
		}
	}

	/**
	 * makeHash gets the file name after uploaded to private folder and hashes it using crypto
	 *
	 * @param {*} fileName
	 * @async
	 */
	async makeHash(fileName) {
		const mykey = crypto.createCipher('aes-128-cbc','mypassword')
		let mystr = mykey.update(fileName, 'utf8', 'hex')
		mystr = mystr + mykey.final('hex')
		this.mystr = mystr
		if(fileName === '') throw new Error('Invalid File Name')
		return mystr

	  }

	/**
	 * stores the hash string in the database
	 *
	 * @param {*} encrypted, fileName
	 * @async
	 */
	async storeHash(encryptedFileName, fileName) {
		const sql = `UPDATE files SET encryptedFileName = "${encryptedFileName}" WHERE fileName = "${fileName}"`
		await this.db.run(sql)
		return encryptedFileName
	}

	/**
	 * test function to populate database
	 *
	 * @param {*} encrypted, fileName
	 * @async
	 */
	async testDummy() {
		const sql = `INSERT INTO files(receiverEmail, senderEmail, filePath, fileName)
		VALUES("1", "1", "1", "Broccoli.png")`
		await this.db.run(sql)
	  }

	/**
	 * test function to populate database
	 *
	 * @param {*}
	 * @async
	 */
	async testHash() {
		const sql = 'SELECT encryptedFileName FROM files WHERE fileName = \'Broccoli.png\''
		await this.db.run(sql)
	  }
}
