'use strict'

const sqlite = require('sqlite-async')
const table = require('../TablesDatabase.js')

module.exports = class Download {
	constructor(dbName = ':memory:') {
		return (async() => {
			try{
				this.db = await sqlite.open(dbName)
				await this.db.run(table.createFileTable())
		  	return this
			} catch(err) {
				throw err
			}
		})()
	}


	async addDummy() {
		try{
			//dummy database records
			const sqlNew = `INSERT INTO files(uploadDate, receiverEmail, senderEmail, filePath, fileName, encryptedFileName)
        		VALUES("date('now')","toze@gmail.com", 1, "../images/alarm.png", "Alarm Image", "666")`
			await this.db.run(sqlNew)
		} catch(err) {
			throw err
		}
	}

	async download(downloadId) {
		try {
			const sql = `SELECT count(downloadId) AS count FROM files WHERE downloadId = "${downloadId}";`
			const records = await this.db.get(sql)
			if(records === 0) throw new Error('Inexistent file.')
			const sql2 = `SELECT filePath FROM files WHERE downloadId = ${downloadId}`
			const filePath = await this.db.get(sql2)
			return filePath
		} catch(err) {
			throw err
		}
	}

	async getName(downloadId) {
		try {
			const sql = `SELECT count(downloadId) AS count FROM files WHERE downloadId = "${downloadId}"`
			const records = await this.db.get(sql)
			if(records === 0) throw new Error('Inexistent file.')
			const sql2 = `SELECT fileName FROM files WHERE downloadId = ${downloadId}`
			const fileName = await this.db.get(sql2)
			return fileName
		} catch(err) {
			throw err
		}
	}

	async deleteFile(downloadId) {
		try {
			const sql2 = `DELETE FROM files WHERE downloadId = ${downloadId}`
			await this.db.run(sql2)
		} catch(err) {
			throw err
		}
	}

	async getHash(encryptedFileName) {
		const sql1 = `SELECT * FROM files WHERE encryptedFileName = "${encryptedFileName}"`
		const file = await this.db.get(sql1)
		return file
	  }

	async testDummy() {
		const sql = `INSERT INTO files(receiverEmail, senderEmail, filePath, fileName, encryptedFileName)
		VALUES("1", "1", "1", "Broccoli.png", "Br0cc0l1")`
		await this.db.run(sql)
	  }
	
	async testHash(fileName) {
		const sql1 = `SELECT encryptedFileName FROM files WHERE fileName = "${fileName}"`
		await this.db.get(sql1)
	}

	async testHash2(encryptedFileName) {
		try {
			const sql1 = `SELECT * FROM files WHERE encryptedFileName = "${encryptedFileName}"`
			await this.db.get(sql1)
		} catch(err) {
			throw err
		}
		
	}
}
