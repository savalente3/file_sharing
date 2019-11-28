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

<<<<<<< HEAD
	test('Wrong email format.', async done => {
		try {
			expect.assertions(1)
			const val = await new Validator()
			await val.emailVal('notanemail')
			done.failed('test failed')
		} catch(err) {
			expect(err.message).toBe('That is not the format of an email address.')
		} finally {
			done()
		}
=======
	test('Wrong email format.', async() => {
		const val = await new Validator()
		await expect( () => val.emailVal('email.com').toThrowError('That is not the format of an email address.') )
	})

	test('Email is not lower cased.', async() => {
		const val = await new Validator()
		await expect( () => val.emailVal('GMAIL@GMAIL.COM').toThrowError('Email addresses are always lower cased.'))
>>>>>>> 4179274fc337c5e5b0d5fb019621aac859277119
	})
})

describe('passVal()', () => {
	test('Missing password.', async done => {
		try {
			expect.assertions(1)
			const val = await new Validator()
			await val.passVal('')
			done.failed('test failed')
		} catch(err) {
			expect(err.message).toBe('Missing password.')
		} finally {
			done()
		}
	})

	test('Password too short.', async done => {
		try {
			expect.assertions(1)
			const val = await new Validator()
			await val.passVal('12')
			done.failed('test failed')
		} catch(err) {
			expect(err.message).toBe('The password needs to have between 8 and 20 characters.')
		} finally {
			done()
		}
	})

<<<<<<< HEAD
	test('Password too long.', async done => {
		try {
			expect.assertions(1)
			const val = await new Validator()
			await val.passVal('123456789123456789123456789')
			done.failed('test failed')
		} catch(err) {
			expect(err.message).toBe('The password needs to have between 8 and 20 characters.')
		} finally {
			done()
		}
=======
	test('Password too long.', async() => {
		const val = await new Validator()
		await expect( () => val.passVal('123456789123456789123456789')
			.toThrowError('The password needs to have between 8 and 20 characters.'))
>>>>>>> 4179274fc337c5e5b0d5fb019621aac859277119
	})
})