'use strict'


module.exports = class Table {

	static createUserTable() {
		return `CREATE TABLE IF NOT EXISTS users 
            (id INTEGER PRIMARY KEY AUTOINCREMENT, 
            username TEXT, email TEXT, pass TEXT);`
	}

	static createFileTable() {
		return `CREATE TABLE IF NOT EXISTS files(
        downloadId INTEGER PRIMARY KEY AUTOINCREMENT,
        filePath TEXT,
        fileName TEXT,
        uploadDate TEXT,
        senderEmail TEXT,
        receiverEmail,
        FOREIGN KEY(senderEmail) REFERENCES users(username)
         );`
	}

}