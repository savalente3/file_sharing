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
<<<<<<< HEAD
        uploadDate TEXT,
=======
        uploadDate DATETIME,
>>>>>>> ae428917050e40a94412fcafa505e05580bda31d
        senderEmail TEXT,
        receiverEmail TEXT,
        FOREIGN KEY(senderEmail) REFERENCES users(username)
         );`
	}

}