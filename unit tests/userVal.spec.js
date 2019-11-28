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
	})
})
