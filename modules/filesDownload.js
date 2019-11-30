/**
 * This is the filesDownload module 
 * @requires "sqllite"
 * @requires "table"
 */

'use strict'

const sqlite = require('sqlite-async')
const table = require('../TablesDatabase.js')

module.exports = class Download {
	
	/**
	 * Creates an instance of Download.
	 * @constructor
	 * @param {*} dbName - the name of the database
	 */
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

	/**
	 * addDummy function
	 * @async
	 */
	
	async addDummy() {
		try{
			//dummy database records
			const sqlNew = `INSERT INTO files(uploadDate, receiverEmail, senderEmail, filePath, fileName)
        		VALUES("date('now')","toze@gmail.com", 1, "../images/alarm.png", "Alarm Image")`
			await this.db.run(sqlNew)
		} catch(err) {
			throw err
		}
	}

	/**
	 * download function - fetches the download file path from the database from a given downloadID
	 * @async
	 * @param {*} downloadId 
	 */
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

	/**
	 * getName function fetches the name of a file, given it's downloadID
	 * @async
	 * @param {*} downloadId 
	 */
	async getName(downloadId) {
		try {
			const sql = `SELECT count(downloadId) AS count FROM files WHERE downloadId = "${downloadId}";`
			const records = await this.db.get(sql)
			if(records === 0) throw new Error('Inexistent file.')
			const sql2 = `SELECT fileName FROM files WHERE downloadId = ${downloadId}`
			const fileName = await this.db.get(sql2)
			return fileName
		} catch(err) {
			throw err
		}
	}

	/**
	 * function deleteFile, deletes the file from it's path, given the downloadID
	 *	@async
	 *  @param {*} downloadId 
	 */
	async deleteFile(downloadId) {
		try {
			const sql2 = `DELETE FROM files WHERE downloadId = ${downloadId}`
			await this.db.run(sql2)
		} catch(err) {
			throw err
		}
	}
}
