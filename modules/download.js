'use strict'

const sqlite = require('sqlite-async')

module.exports = class Download {
	constructor(dbName = ':memory:') {
		return (async() => {
			try{
				this.db = await sqlite.open(dbName)
			  // we need this table to store the files info
				const sql = 'CREATE TABLE IF NOT EXISTS files(downloadId INTEGER PRIMARY KEY AUTOINCREMENT,'
          + 'receiverEmail TEXT, senderId INTEGER, filePath TEXT, fileName TEXT,'
				'FOREIGN KEY ("senderId") REFERENCES users("id"));'
				await this.db.run(sql)
		  	return this
			} catch(err) {
				throw err
			}
		})()
	}

	async addDummy() {
		try{
			//dummy database records
			const sqlNew = 'INSERT INTO files(receiverEmail, senderId, filePath, fileName)' +
        'VALUES("toze@gmail.com", 1, "../images/alarm.png", "Alarm Image")'
			await this.db.run(sqlNew)

			const sqlNew2 = 'INSERT INTO files(receiverEmail, senderId, filePath, fileName)' +
        'VALUES("jojojojo@gmail.com", 2, "../images/facebook.png", "Facebook Image")'
			await this.db.run(sqlNew2)
		} catch(err) {
			throw err
		}
	}

	async download(downloadId) {
		try {
			const sql = `SELECT filePath FROM files WHERE downloadId = ${downloadId}`
			const filePath = await this.db.get(sql)
			return filePath
		} catch(err) {
			throw err
		}

	}

	async getName(downloadId) {
		try {
			const sql = `SELECT fileName FROM files WHERE downloadId = ${downloadId}`
			const fileName = await this.db.get(sql)
			return fileName
		} catch(err) {
			throw err
		}
	}
}
