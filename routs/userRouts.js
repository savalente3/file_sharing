#!/usr/bin/env node
'use strict'

/* MODULE IMPORTS */
const Router = require('koa-router')
const koaBody = require('koa-body')({
	multipart: true,
	uploadDir: '.'
})

//const jimp = require('jimp')

/* IMPORT CUSTOM MODULES */
const User = require('../modules/user')


const router = new Router()
const dbName = 'website.db'

/**
 * The user registration page.
 *
 * @name Register Page
 * @route {GET} /register
 */
router.get('/register', koaBody, async ctx => {
	try{
		if (ctx.session.authorised === true) {
			ctx.redirect('/?msg=user already loged in')
		}else{
			await ctx.render('register')
		}

	}catch (err) {
		await ctx.render('error', {
			message: err.message
		})
	}
})

/**
 * The user registration page.
 *
 * @name Register Page
 * @route {POST} /register
 */
router.post('/register', koaBody, async ctx => {
	try {
		const body = ctx.request.body
		// call the functions in the module
		const user = await new User(dbName)
		await user.register(body.username, body.email, body.pass)
		await user.uploadPicture(ctx.request.files.avatar.path, 'image/png', body.username)
		await user.login(body.username, body.pass)
		ctx.session.authorised = true
		//saving user name in session auth
		ctx.session.user = body.username
		ctx.redirect(`/?msg=new user "${body.username}" added`)
		user.db.close()
	} catch (err) {
		console.log(err)
		await ctx.render('error', {
			message: err.message
		})
	}
})

/**
 * The website about page.
 *
 * @name About Page
 * @route {GET} /about
 */
router.get('/about/', async ctx => await ctx.render('about', {
	user: ctx.session.user
}))

/**
 * The script to process users login.
 *
 * @name Login Script
 * @route {GET} /login
 */
router.get('/login', async ctx => {
	const data = {}
	if (ctx.query.msg) data.msg = ctx.query.msg
	if (ctx.query.user) data.user = ctx.query.user

	console.log(data.user)
	await ctx.render('login', data)

	try{
		 if (ctx.session.authorised === true) {
			ctx.redirect('/?msg=user already loged in')
		}else{
			await ctx.render('login')
		}
	}catch (err) {
		await ctx.render('error', {
			message: err.message
		})
	}
})

/**
 * The script to process users login.
 *
 * @name Login Script
 * @route {POST} /login
 */
// eslint-disable-next-line max-lines-per-function
router.post('/login', async ctx => {
	try {
		const body = ctx.request.body
		const user = await new User(dbName)
		await user.login(body.user, body.pass)
		const userCkeck = await user.login(body.user, body.pass)
		if (userCkeck) {
			ctx.session.authorised = true
			ctx.session.user = body.user
			return ctx.redirect('/?msg=you are now logged in...')
		}
	} catch (err) {
		await ctx.render('error', {
			message: err.message
		})
	}
})

/**
 * The script to process users logout.
 *
 * @name Logout Script
 * @route {GET} /logout
 */
router.get('/logout', async ctx => {
	ctx.session.authorised = null
	ctx.session.user = null
	ctx.redirect('/?msg=you are now logged out')
})


module.exports = router
