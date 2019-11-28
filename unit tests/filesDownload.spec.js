'use strict'

const Download = require('../modules/filesDownload')

describe('download()', () => {
	test('File does not exist in the database. (on download)', async done => {
		try{
			expect.assertions(1)
			const file = await new Download()
			await file.addDummy(123, 'email@gmail.com', 1, '2019-10-1 13:23:42')
			await file.download(124)
<<<<<<< HEAD
			done.failed('test failed')	
=======
		    done.failed('test failed')
>>>>>>> 4179274fc337c5e5b0d5fb019621aac859277119
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
<<<<<<< HEAD
			await file.getName(125)
			done.failed('test failed')	
=======
			await file.download(125)
		    done.failed('test failed')
>>>>>>> 4179274fc337c5e5b0d5fb019621aac859277119
		} catch(err) {
			expect(err.message).toBe('That file does not exist in the database')
		} finally {
			done()
		}
	})
})
