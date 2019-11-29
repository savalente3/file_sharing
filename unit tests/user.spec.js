
'use strict'

const User = require('../modules/user.js')

describe('register()', () => {
	test('register a valid account', async() => {
		const account = await new User()
		const register = await account.register('doej', 'email@gmail.com', 'password')
		expect(register).toBe(true)
	})

	test('register a duplicate username', async done => {
		try{
			expect.assertions(1)
			const account = await new User()
			await account.register('doej', 'email@gmail.com', 'password')
			await account.register('doej', 'email@gmail.com', 'password')
			done.failed('test failed')
		} catch(err) {
			expect(err.message).toBe('Username already in use.')
		} finally {
			done()
		}
	})
})

describe('uploadPicture()', () => {
	// this would have to be done by mocking the file system
	// perhaps using mock-fs?
})

describe('login()', () => {
	test('invalid username', async done => {
		try {
			expect.assertions(1)
			const account = await new User()
			await account.register('doej', 'email@gmail.com', 'password')
			await account.login('roej', 'password')
			done.failed('test failed')
		} catch(err) {
			expect(err.message).toBe('user \"roej\" not found')
		} finally {
			done()
		}
	})

	test('invalid password', async done => {
		try {
			expect.assertions(1)
			const account = await new User()
			await account.register('doej', 'email@gmail.com', 'password')
			await account.login('doej', 'password1')
			done.failed('test failed')
		} catch(err) {
			expect(err.message).toBe('invalid password for account \"doej\"')
		} finally {
			done()
		}
	})

	test('log in with valid credentials', async() => {
		const account = await new User()
		await account.register('doej', 'email@gmail.com', 'password')
		expect(await account.login('doej', 'password')).toEqual(true)
	})
})
