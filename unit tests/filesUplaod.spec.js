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
