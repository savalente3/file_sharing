'use strict'


module.exports = class Table {

	static createFileTable() {
		return `CREATE TABLE IF NOT EXISTS files(
        downloadId INTEGER PRIMARY KEY AUTOINCREMENT,
        receiverEmail TEXT,
        filePath TEXT,
        fileName TEXT,
        senderId INTEGER,
        FOREIGN KEY("senderId") REFERENCES "users"("id")
         );`
	}

	static createUserTable() {
		return `CREATE TABLE IF NOT EXISTS users
        (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, email TEXT, pass TEXT);`
	}
}
