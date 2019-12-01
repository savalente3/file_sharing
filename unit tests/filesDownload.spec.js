'use strict'

const Download = require('../modules/filesDownload')

describe('download()', () => {
	test('File does not exist in the database. (on download)', async done => {
		try{
			const file = await new Download()
			await file.addDummy(123)
			await file.download(124)
		} catch(err) {
			expect(err.message).toBe('Inexistent file.')
		} finally {
			done()
		}
	})
})

describe('getName()', () => {
	test('File does not exist in the database. (on get name)', async done => {
		try{
			const file = await new Download()
			await file.addDummy(124)
			await file.getName(125)	
		} catch(err) {
			expect(err.message).toBe('Inexistent file.')
		} finally {
			done()
		}
	})
})

describe('delete()', () => {
	test('File is being deleted.', async done => {
		try {
			const file = await new Download()
			await file.addDummy(125)
			await file.deleteFile(125)
			await file.download(125)
		} catch(err) {
			expect(err.message).toBe('Inexistent file.')
		} finally {
			done()
		}
	})
})

describe('addDummy()', () => {
	test('Dummy created successfully.', async() => {
		const file = await new Download()
		expect(await file.addDummy(126)).toEqual(true)
	})
})


describe('testHash()', () => {

	beforeEach( async() => {
		const download = await new Download()
		download.testDummy()
	})

	test('Getting the encrypted file name from the database', async done => {
		expect.assertions(1)
		const download = await new Download()
		download.testDummy()
		try{
			const download = await new Download()
			await download.testHash('Broccoli.png')
			expect(download.testHash()).toBeTruthy()
		} catch(err) {
			done.fail(err)
		} finally {
			done()
		}
	})
})

describe('testHash2', () => {

	test('Encrypted File name does not exist in database', async done => {
		try {
			const download = await new Download()
			await download.testHash2('Invalid Test')
		} catch(err) {
			expect(err.message).toBe('Inexistent file')
		} finally {
			done()
		}
	})
})