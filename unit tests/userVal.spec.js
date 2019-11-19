'use strict'

const Validator = require('../modules/userVal')
const val = new Validator()

describe('userVal()', () => {
	test('Missing username.', async done => {
		try {
			expect.assertions(1)
			val.userVal('')
<<<<<<< HEAD
			done.fail('test failed')

		} catch(err) {
			expect(err.message).toBe('Missing username.')
		} finally {
			done()
		}
	})

=======
			done.fail('test failed')       
		} catch(err) {
			expect(err.message).toBe('Missing username.')
		} finally {
			done()
		}
	})

>>>>>>> origin/guilherme
	test('Username too long.', async done => {
		try {
			expect.assertions(1)
			val.userVal('aaaaaaaaaaaaaaaaaaaa')
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
			val.emailVal('')
			done.fail('test failed')
<<<<<<< HEAD

=======
                        
>>>>>>> origin/guilherme
		} catch(err) {
			expect(err.message).toBe('Missing email.')
		} finally {
			done()
		}
	})

	test('Wrong format email.', async done => {
		try {
			expect.assertions(1)
			val.emailVal('greatemail.com')
			done.fail('test failed')
		} catch(err) {
			expect(err.message).toBe('That is not the format of an email address.')
		} finally {
			done()
		}
	})

<<<<<<< HEAD
	test('Email is not lower cased.', async done => {
=======
	test('Email is not lower cased.', async done =>{
>>>>>>> origin/guilherme
		try {
			expect.assertions(1)
			val.emailVal('GOODEMAIL@GMAIL.COM')
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
			val.passVal('')
			done.fail('test failed')
<<<<<<< HEAD

		} catch(err) {
			expect(err.message).toBe('Missing password.')
=======
                        
		} catch(err) {
			expect(err.message).toBe('Missing password.')
		} finally {
			done()
		}
	})

	test('Password too short.', async done => {
		try {
			expect.assertions(1)
			val.passVal('1')
			done.fail('test failed')
		} catch(err) {
			expect(err.message).toBe('The password needs to have between 8 and 20 characters.')
>>>>>>> origin/guilherme
		} finally {
			done()
		}
	})

<<<<<<< HEAD
	test('Password too short.', async done => {
		try {
			expect.assertions(1)
			val.passVal('1')
			done.fail('test failed')
		} catch(err) {
			expect(err.message).toBe('The password needs to have between 8 and 20 characters.')
		} finally {
			done()
		}
	})

=======
>>>>>>> origin/guilherme
	test('Password too long.', async done => {
		try {
			expect.assertions(1)
			val.passVal('111111111111111111111')
			done.fail('test failed')
		} catch(err) {
			expect(err.message).toBe('The password needs to have between 8 and 20 characters.')
		} finally {
			done()
		}
	})
})

