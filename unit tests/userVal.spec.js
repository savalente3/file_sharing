'use strict'

const Validator = require('../modules/userVal')

describe('userVal()', () => {
	test('Missing username.', async() => {
		const val = await new Validator()
		await expect( () => val.userVal('').toThrowError('Missing username.') )
	})

	test('Username too long.', async() => {
		const val = await new Validator()
		await expect( () => val.userVal('aaaaaaaaaaaaaaaaaaa')
			.toThrowError('Username too long. Must be less than 20 characters.') )
	})
})

describe('emailVal()', () => {
	test('Missing email.', async() => {
		const val = await new Validator()
		await expect( () => val.emailVal('').toThrowError('Missing email.') )
	})

	test('Wrong email format.', async() => {
		const val = await new Validator()
		await expect( () => val.emailVal('email.com').toThrowError('That is not the format of an email address.') )
	})

	test('Email is not lower cased.', async() =>{
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
		await expect( () => val.passVal('123456789123456789123456789').toThrowError('The password needs to have between 8 and 20 characters.'))
	})
})

