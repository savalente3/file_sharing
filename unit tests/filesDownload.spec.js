'use strict'

const Download = require('../modules/filesDownload')

describe('download()', () => {
	test('File does not exist in the database. (on download)', async done => {
		try{
			expect.assertions(1)
			const file = await new Download()
			await file.addDummy(123, 'email@gmail.com', 1, '2019-10-1 13:23:42')
			await file.download(124)
			done.failed('test failed')
		} catch(err) {
			expect(err.message).toBe('That file does not exist in the database')
		} finally {
			done()
		}
	})

	test('File does not exist in the database. (on get name)', async done => {
		try{
			expect.assertions(1)
			const file = await new Download()
			await file.addDummy(124, 'email@gmail.com', 1, '2019-10-1 13:23:42')
			await file.getName(125)
			done.failed('test failed')
		} catch(err) {
			expect(err.message).toBe('That file does not exist in the database')
		} finally {
			done()
		}
	})
})
