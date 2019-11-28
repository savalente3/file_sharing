'use strict'

const Validator = require('../modules/userVal')

describe('userVal()', () => {
	test('Missing username.', async done => {
		try {
			expect.assertions(1)
			const val = await new Validator()
			await val.userVal('')
			done.failed('test failed')
		} catch(err) {
			expect(err.message).toBe('Missing username.')
		} finally {
			done()
		}
	})

	test('Username too long.', async done => {
		try {
			expect.assertions(1)
			const val = await new Validator()
			await val.userVal('aaaaaaaaaaaaaaaaaaaaaa')
			done.failed('test failed')
		} catch(err) {
			expect(err.message).toBe('Username too long. Must be less than 20 characters.')
		} finally {
			done()
		}
	})
})

describe('emailVal()', () => {
	test('Missing email.', async done => {
		try {
			expect.assertions(1)
			const val = await new Validator()
			await val.emailVal('')
			done.failed('test failed')
		} catch(err) {
			expect(err.message).toBe('Missing email.')
		} finally {
			done()
		}
	})

	test('Wrong email format.', async() => {
		const val = await new Validator()
		await expect( () => val.emailVal('email.com').toThrowError('That is not the format of an email address.') )
	})

	test('Email is not lower cased.', async() => {
		const val = await new Validator()
		await expect( () => val.emailVal('GMAIL@GMAIL.COM').toThrowError('Email addresses are always lower cased.'))
	})
})

describe('passVal()', () => {
	test('Missing password.', async() => {
		const val = await new Validator()
		await expect( () => val.passVal('').toThrowError('Missing password.'))
	})

	test('Password too short.', async() => {
		const val = await new Validator()
		await expect( () => val.passVal('12').toThrowError('The password needs to have between 8 and 20 characters.'))
	})

	test('Password too long.', async() => {
		const val = await new Validator()
		await expect( () => val.passVal('123456789123456789123456789')
			.toThrowError('The password needs to have between 8 and 20 characters.'))
	})
})

