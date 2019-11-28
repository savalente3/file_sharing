'use strict'

const Validator = require('../modules/userVal')
const val = new Validator()

describe('userVal()', () => {
	test('Missing username.', async done => {
		try {
			expect.assertions(1)
			await val.userVal('')
			done.fail('test failed')
		} catch(err) {
			expect(err.message).toBe('Missing username.')
		} finally {
			done()
		}
	})

	test('Username too long.', async done => {
		try {
			expect.assertions(1)
			await val.userVal('aaaaaaaaaaaaaaaaaaaa')
			done.fail('test failed')
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
			await val.emailVal('')
			done.fail('test failed')

		} catch(err) {
			expect(err.message).toBe('Missing email.')
		} finally {
			done()
		}
	})

	test('Wrong format email.', async done => {
		try {
			expect.assertions(1)
			await val.emailVal('greatemail.com')
			done.fail('test failed')
		} catch(err) {
			expect(err.message).toBe('That is not the format of an email address.')
		} finally {
			done()
		}
	})

	test('Email is not lower cased.', async done =>{
		try {
			expect.assertions(1)
			await val.emailVal('GOODEMAIL@GMAIL.COM')
			done.fail('test failed')
		} catch(err) {
			expect(err.message).toBe('Email addresses are always lower cased.')
		} finally {
			done()
		}
	})
})

describe('passVal()', () => {
	test('Missing password.', async done => {
		try {
			expect.assertions(1)
			await val.passVal('')
			done.fail('test failed')

		} catch(err) {
			expect(err.message).toBe('Missing password.')
		} finally {
			done()
		}
	})

	test('Password too short.', async done => {
		try {
			expect.assertions(1)
			await val.passVal('1')
			done.fail('test failed')
		} catch(err) {
			expect(err.message).toBe('The password needs to have between 8 and 20 characters.')
		} finally {
			done()
		}
	})

	test('Password too long.', async done => {
		try {
			expect.assertions(1)
			await val.passVal('111111111111111111111')
			done.fail('test failed')
		} catch(err) {
			expect(err.message).toBe('The password needs to have between 8 and 20 characters.')
		} finally {
			done()
		}
	})
})

