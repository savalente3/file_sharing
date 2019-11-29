/* eslint-disable prefer-arrow-callback */ 
'use strict'

const assert = require('assert')
const {Given, When, Then, Before, BeforeAll, AfterAll, setDefaultTimeout} = require('cucumber')
const puppeteer = require('puppeteer')

//Puppeteer browser plus page variables
let browser
let currentPage


setDefaultTimeout(60 * 1000);

//Before the tests are run we need to set up the browser
BeforeAll(async function() {
	browser = await puppeteer.launch({
		defaultViewport: {
			width: 800,
			height: 800
		}
	})
})

//Since it was opened now it needs to be closed after the tests are complete
AfterAll(async function() {
	await browser.close()
})

//We don't want the tests for each scenario to use a page with things in there
Before(async function() {
	currentPage = await browser.newPage()
})

//Register successful
Given('username is {string}, the password {string}, the email {string} and the user adds a profile photo',
	async function(username, password, email ) {
		await currentPage.goto('http://localhost:8080/logout')
		await currentPage.goto('http://localhost:8080/register')

		await currentPage.type('input[name=username]', username)
		await currentPage.type('input[name=pass]', password)
		await currentPage.type('input[name=email]', email)
		await currentPage.type('input[type=file]', '../public/avatars/human.png')
	})

When('I try to register', async function() {
	await currentPage.click('input[type=submit]')
})

Then('I should be redirected to the homepage with a message assuring {string} was registered', async function(username) {
	assert(await currentPage.url() === `http://localhost:8080/?msg=new%20user%20%22${username}%22%20added`, `got ${currentPage.url()}`)
})


//Register successful with no picture
Given('username is {string}, the password {string} and the email {string}',
	async function(username, password, email ) {
		await currentPage.goto('http://localhost:8080/logout')
		await currentPage.goto('http://localhost:8080/register')

		await currentPage.type('input[name=username]', username)
		await currentPage.type('input[name=pass]', password)
		await currentPage.type('input[name=email]', email)
	})

When('I try to register with no picture', async function() {
	await currentPage.click('input[type=submit]')
})

Then('I should be redirected to the homepage with a message assuring {string} was registered with no picture', async function(username) {
    assert(await currentPage.url() === `http://localhost:8080/?msg=new%20user%20%22${username}%22%20added`, `got ${currentPage.url()}`)
})


//Register existing username
Given('existing username is {string}, the password {string}, the email {string}',
	async function(username, password, email ) {
		await currentPage.goto('http://localhost:8080/logout')
		await currentPage.goto('http://localhost:8080/register')

		await currentPage.type('input[name=username]', username)
		await currentPage.type('input[name=pass]', password)
		await currentPage.type('input[name=email]', email)
	})

When('I try to register an existing username', async function() {
	await currentPage.click('input[type=submit]')
})

Then('I should stay in the registry page with and error that the user was already taken', async function() {
    assert(await currentPage.url() === 'http://localhost:8080/register', `got ${currentPage.url()}`)
})


//Register invalid username
Given('invalid username is {string}, the password {string}, the email {string}',
	async function(username, password, email ) {
		await currentPage.goto('http://localhost:8080/logout')
		await currentPage.goto('http://localhost:8080/register')

		await currentPage.type('input[name=username]', username)
		await currentPage.type('input[name=pass]', password)
		await currentPage.type('input[name=email]', email)
	})

When('I try to register with an invalid username', async function() {
	await currentPage.click('input[type=submit]')
})

Then('I should stay in the registry page with and error that the username is invalid', async function() {
    assert(await currentPage.url() === 'http://localhost:8080/register', `got ${currentPage.url()}`)
})


//Register invalid email
Given('username is {string}, the password {string}, the invalid email {string}',
	async function(username, password, email ) {
		await currentPage.goto('http://localhost:8080/logout')
		await currentPage.goto('http://localhost:8080/register')

		await currentPage.type('input[name=username]', username)
		await currentPage.type('input[name=pass]', password)
		await currentPage.type('input[name=email]', email)
	})

When('I try to register with an invalid email', async function() {
	await currentPage.click('input[type=submit]')
})

Then('I should stay in the registry page with and error that the email is invalid', async function() {
    assert(await currentPage.url() === 'http://localhost:8080/register', `got ${currentPage.url()}`)
})


//Register invalid password
Given('username is {string}, the invalid password {string}, the email {string}',
	async function(username, password, email ) {
		await currentPage.goto('http://localhost:8080/logout')
		await currentPage.goto('http://localhost:8080/register')

		await currentPage.type('input[name=username]', username)
		await currentPage.type('input[name=pass]', password)
		await currentPage.type('input[name=email]', email)
	})

When('I try to register with an invalid password', async function() {
	await currentPage.click('input[type=submit]')
})

Then('I should stay in the registry page with and error that the password is invalid', async function() {
    assert(await currentPage.url() === 'http://localhost:8080/register', `got ${currentPage.url()}`)
})
