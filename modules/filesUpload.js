'use strict'

const sqlite = require('sqlite-async')
const table = require('../TablesDatabase.js')
const mime = require('mime-types')
const fs = require('fs-extra')

module.exports = class Upload {
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

	async uploadFile(path) {
		await fs.copy(path)
	}
}
