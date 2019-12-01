
'use strict'

const User = require('../modules/user.js')
const mock = require('mock-fs')

beforeAll( async() => {
	mock({
		'img1.png': Buffer.from([8, 6, 7, 5, 3, 0, 9]),
		'img2.doc': Buffer.from([8, 6, 7, 5, 3, 0, 9])
	})
})

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
	test('Valid image', async done => {
		expect.assertions(1)
		const user1 = await new User()
		const path = 'img1.png'
		const mimeType = 'image/png'
		const user = 'username'
		const uploaded = user1.uploadPicture(path, mimeType, user)
		expect(uploaded).toBe(true)
		done()
	})

	afterAll(() => {
		mock.restore()
	})
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
