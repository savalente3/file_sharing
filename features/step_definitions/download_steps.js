/* eslint-disable prefer-arrow-callback */ 
'use strict'

const assert = require('assert')
const {Given, When, Then, Before, BeforeAll, AfterAll} = require('cucumber')
const puppeteer = require('puppeteer')
const app = require('../../index')

//Puppeteer browser plus page variables
let browser
let currentPage

//Before the tests are run we need to set up the browser
BeforeAll(async function() {
	browser = await puppeteer.launch({
		headless: true,
		defaultViewport: {
			width: 800,
			height: 800
		}
    })
})

//Since it was opened now it needs to be closed after the tests are complete
AfterAll(function() {
	server.close()
	browser.close()
})

//We don't want the tests for each scenario to use a page with things in there
Before(async function() {
	currentPage = await browser.newPage()
})

//Login successful
Given('username is {string} and the password {string}', async function(username, password) {
    await currentPage.goto('localhost:8080/login')

    await currentPage.type('input[name=user]', username)
    await currentPage.type('input[name=pass]', password)
})

When('I try to log in', async function() {
    await currentPage.click('button[type=submit]')
})

Then('I should be redirected to the homepage with a message assuring I was logged in', async function() {
    console.log(await currentPage.content())

    assert(await currentPage.url() === 'https://localhost:8080//?msg=you are now logged in...')
})

// Wrong password
// Given('username is {string} and the password {string}', async function(username, password) {
//     await currentPage.goto('https://localhost:8080/login')

//     await currentPage.type('input[name=user]', username)
//     await currentPage.type('input[name=pass]', password)
// })

// When('I try to log in', async function() {
//     await currentPage.click('button[type=submit]')
// })

// Then('I should be redirected to the homepage with a message assuring I was logged in', async function() {
//     console.log(await currentPage.content())

//     assert(await currentPage.url() === 'https://localhost:8080/error')
// })

// Wrong username
// Given('username is {string} and the password {string}', async function(username, password) {
//     await currentPage.goto('https://localhost:8080/login')

//     await currentPage.type('input[name=user]', username)
//     await currentPage.type('input[name=pass]', password)
// })

// When('I try to log in', async function() {
//     await currentPage.click('button[type=submit]')
// })

// Then('I should be redirected to the homepage with a message assuring I was logged in', async function() {
//     console.log(await currentPage.content())

//     assert(await currentPage.url() === 'https://localhost:8080/error')
// })