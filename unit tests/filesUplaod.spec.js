'use strict'

const Upload = require('../modules/filesUpload.js')

describe('getSenderEmailWithUsername(username)', () => {

	test('getting senderEmail with username.', async done => {
		expect.assertions(1)
		const upload = await new Upload()
		await upload.testUser()
		const user = await upload.getSenderEmailWithUsername('test')
		expect(user.email).toBe('sofiacirne12@gmail.com')
		done()
	})

	//works fine with the receiver username, but doesnt for the receiver email

	test('Invalid username.', async done => {
		expect.assertions(1)
		const upload = await new Upload()
		await upload.testUser()
		await expect(upload.getSenderEmailWithUsername('sofia5')).rejects
			.toEqual(Error('Inexistent user.'))
		done()
	})

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
