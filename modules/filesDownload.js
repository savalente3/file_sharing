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

	async addDummy(downloadId, email, senderId, uploadDate) {
		try{
			//dummy database records
			const sqlNew = `INSERT INTO files(receiverEmail, senderId, filePath, fileName, uploadDate)
        		VALUES(${downloadId} ,${email}, ${senderId}, 'random path', 'random name', ${uploadDate})`
			await this.db.run(sqlNew)
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
