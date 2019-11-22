'use strict'

const Download = require('../modules/filesDownload')

describe('download()', () => {
	test('File does not exist in the database. (on download)', async() => {
		const file = await new Download()
		await file.addDummy(123, 'email@gmail.com', 1, '2019-10-1 13:23:42')
		expect( () => file.download(124).toThrowError('Inexistent file.'))
	})
    
	test('File does not exist in the database. (on get name)', async() => {
		const file = await new Download()
		await file.addDummy(123,'email@gmail.com', 1, '2019-10-1 13:23:42')
		expect( () => file.getName(124).toThrowError('Inexistent file.'))
	})
})