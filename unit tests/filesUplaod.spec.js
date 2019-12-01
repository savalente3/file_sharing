'use strict'

const Upload = require('../modules/filesUpload.js')
const mock = require('mock-fs')

beforeAll( async() => {
	// mock({
	// 	'img1.png': Buffer.from([8, 6, 7, 5, 3, 0, 9]),
	// 	'img2.doc': Buffer.from([8, 6, 7, 5, 3, 0, 9])
	// })
	// mock({
	// 	'some/dir': mock.directory({
	// 		mode: '0755',
	// 		items: {
	// 			file1: Buffer.from([8, 6, 7, 5, 3, 0, 9]),
	// 			file2: Buffer.from([8, 6, 7, 5, 3, 0, 9])
	// 		}
	// 	})
	// })

})

describe('getSenderEmailWithUsername(username)', () => {

	test('getting senderEmail with username.', async done => {
		expect.assertions(1)
		const upload = await new Upload()
		await upload.testUser()
		const user = await upload.getSenderEmailWithUsername('test')
		expect(user.email).toBe('sofiacirne12@gmail.com')
		done()
	})

	test('Invalid username.', async done => {
		expect.assertions(1)
		const upload = await new Upload()
		await upload.testUser()
		await expect(upload.getSenderEmailWithUsername('sofia5')).rejects
			.toEqual(Error('Inexistent user.'))
		done()
	})
})

describe('uploadFiles()', () => {

	test('uploadFiles send imgage', async done => {
		expect.assertions(1)
		const upload = await new Upload()
		await upload.testUser()
		await upload.testEmail()
		const user = await upload.uploadFiles('png','image/png','dummy.png').mock
		expect(user).toBe(undefined)
		done()

	})
	// test('----------', async done => {
	// 	expect.assertions(1)
	// 	const upload = await new Upload()
	// 	await upload.testUser()
	// 	const user = await upload.getSenderEmailWithUsername('test')
	// 	expect(user.email).toBe('sofiacirne12@gmail.com')
	// 	done()
	// })
})

describe('makeHash()', () => {
	beforeEach( async() => {
		const upload = await new Upload()
		upload.testDummy()
	})


	test('Creating a Hash key based on the file name', async done => {
		expect.assertions(1)
		try {
			const upload = await new Upload()
			upload.makeHash('Broccoli.png')
			upload.storeHash()
			expect(upload.makeHash()).toEqual(upload.testHash())
		} catch (err) {
			done.fail(err)
		} finally {
			done()
		}
	})

})

describe('storeHash()', () => {
	beforeEach( async() => {
		const upload = await new Upload()
		upload.testDummy()
	})

	test('Storing the hash in the DB', async done => {
		try{
			const upload =  await new Upload()
			await upload.storeHash('Br0cc0l1', 'Broccoli.png')
			expect(upload.storeHash('Br0cc0l1', 'Broccoli.png')).toEqual(upload.testHash())
		} catch(err) {
			done.fail(err)
		} finally {
			done()
		}
	})
})
