'use strict'

const Validator = require('../modules/userVal')
const val = new Validator()

describe('userVal()', () => {
	test('Missing username.', async done => {
		try {
			expect.assertions(1)
			val.userVal('')
			done.fail('test failed')

		} catch(err) {
			expect(err.message).toBe('Missing username.')
		} finally {
			done()
		}
	})

	test('Missing email.', async done => {
		try {
			expect.assertions(1)
			val.emailVal('')
			done.fail('test failed')

		} catch(err) {
			expect(err.message).toBe('Missing email.')
		} finally {
			done()
		}
	})

	test('Missing password.', async done => {
		try {
			expect.assertions(1)
			val.passVal('')
			done.fail('test failed')

		} catch(err) {
			expect(err.message).toBe('Missing password.')
		} finally {
			done()
		}
	})
})
