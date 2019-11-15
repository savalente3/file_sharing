
'use strict'

const Accounts = require('../modules/user.js')

describe('register()', () => {
	test('register a valid account', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		const register = await account.register('doej', 'password')
		expect(register).toBe(true)
		done()
	})

	test('register a duplicate username', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await account.register('doej', 'password')
		await expect( account.register('doej', 'password') )
			.rejects.toEqual( Error('Username already in use.') )
		done()
	})
})

describe('uploadPicture()', () => {
	// this would have to be done by mocking the file system
	// perhaps using mock-fs?
})

describe('login()', () => {
	test('log in with valid credentials', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await account.register('doej', 'password')
		const valid = await account.login('doej', 'password')
		expect(valid).toBe(true)
		done()
	})

	test('invalid username', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await account.register('doej', 'password')
		await expect( account.login('roej', 'password') )
			.rejects.toEqual( Error('username "roej" not found') )
		done()
	})

	test('invalid password', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await account.register('doej', 'password')
		await expect( account.login('doej', 'bad') )
			.rejects.toEqual( Error('invalid password for account "doej"') )
		done()
	})

})
