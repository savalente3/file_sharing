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
var crypto = require('crypto')


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
		// const senderEmail

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

	async testEmail() {
		await this.db.run(table.createUserTable())
		const sql = `INSERT INTO files(receiverEmail, senderEmail, filePath, fileName)
		VALUES("receiverEmail@gmail.com", "senderEmail@gmail.com", "private/png/666666666", "666666666")`
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
		this.filepath = `private/${extension}/${fileName}`
		this.fileName = fileName
		await fs.copy(path, this.filepath)
		return true
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
			this.insert = await this.db.get(sql)
			if(this.insert === undefined) throw new Error('Inexistent user.')
			// if(this.senderEmail === undefined) throw new Error('Inexistent user.')
			return true
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
			const sql = `INSERT INTO files(receiverEmail, senderEmail, filePath, fileName)
			VALUES("${ReceiverEmail.email}", "${this.senderEmail.email}", "${this.filepath}", "${this.fileName}")`
			await this.db.get(sql)
			return ReceiverEmail.email
		} catch (err) {
			throw err
		}
	}

	
	async makeHash(fileName) {
		const mykey = crypto.createCipher('aes-128-cbc','mypassword')
		let mystr = mykey.update(fileName, 'utf8', 'hex')
		mystr = mystr + mykey.final('hex')
		this.mystr = mystr
		if(fileName === '') throw new Error('Invalid File Name')
		return mystr
		
	  }

	async storeHash(encrypted, fileName) {
		const sql = `UPDATE files SET encryptedFileName = "${encrypted}" WHERE fileName = "${fileName}"`
		await this.db.run(sql)
		return encrypted
	}

	async testDummy() {
		const sql = `INSERT INTO files(receiverEmail, senderEmail, filePath, fileName)
		VALUES("1", "1", "1", "Broccoli.png")`
		await this.db.run(sql)
	  }

	async testHash() {
		const sql = `SELECT encryptedFileName FROM files WHERE fileName = 'Broccoli.png'`
		await this.db.run(sql)
	  }
}
