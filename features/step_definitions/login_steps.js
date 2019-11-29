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

//Login successful
Given('username is {string} and the password {string}', async function(username, password) {
	await currentPage.goto('http://localhost:8080/logout')
	await currentPage.goto('http://localhost:8080/login')

	await currentPage.type('input[type=text]', username)
	await currentPage.type('input[name=pass]', password)
})

When('I try to log in', async function() {
	await currentPage.click('input[type=submit]')
})

Then('I should be redirected to the homepage with a message assuring I was logged in', async function() {
	assert(await currentPage.url() === 'http://localhost:8080/?msg=you%20are%20now%20logged%20in...')
})


//Wrong password
Given('username is {string} and the wrong password {string}', async function(username, password) {
	await currentPage.goto('http://localhost:8080/logout')
	await currentPage.goto('http://localhost:8080/login')

	await currentPage.type('input[type=text]', username)
	await currentPage.type('input[type=password]', password)
})

When('I try to log in with wrong password', async function() {
	await currentPage.click('input[type=submit]')
})

Then('I should be asked to try again with an error telling me the password was incorrect', async function() {
	assert(await currentPage.url() === 'http://localhost:8080/login')
})


//Wrong username
Given('wrong username is {string} and the password {string}', async function(username, password) {
	await currentPage.goto('http://localhost:8080/logout')
	await currentPage.goto('http://localhost:8080/login')

	await currentPage.type('input[name=user]', username)
	await currentPage.type('input[name=pass]', password)
})

When('I try to log in with wrong username', async function() {
	await currentPage.click('input[type=submit]')
})

Then('I should be asked to try again with an error telling me the username doesn\'t exist', async function() {
	assert(await currentPage.url() === 'http://localhost:8080/login')
})