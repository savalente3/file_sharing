'use strict'

const User = require('../modules/user.js')

describe('register()', () => {
	test('register a valid account', async() => {
		const account = await new User()
		expect( () => account.register('doej', 'email@gmail.com', 'password') ).toBeTruthy
	})

	test('register a duplicate username', async() => {
		const account = await new User()
		await account.register('doej', 'email@gmail.com', 'password')
		expect( () => account.register('doej', 'email@gmail.com', 'password').toThrowError('Username already in use.'))
	})
})

describe('uploadPicture()', () => {
	// this would have to be done by mocking the file system
	// perhaps using mock-fs?
})

describe('login()', () => {
	test('log in with valid credentials', async() => {
		const account = await new User()
		await account.register('doej', 'email@gmail.com', 'password')
		expect( () => account.login('doej', 'password') ).toBeTruthy
	})

	test('invalid username', async() => {
		const account = await new User()
		await account.register('doej', 'email@gmail.com', 'password')
		expect( () => account.login('roej', 'password').toThrowError('user roej not found'))
	})

	test('invalid password', async() => {
			const account = await new User()
			await account.register('doej', 'email@gmail.com', 'password')
			expect( () => account.login('doej', 'password1').toThrowError('invalid password for account doej'))
	})
})
