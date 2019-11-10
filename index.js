#!/usr/bin/env node

//Routes File

'use strict'

/* MODULE IMPORTS */
const Koa = require('koa')
const Router = require('koa-router')
const views = require('koa-views')
const staticDir = require('koa-static')
const bodyParser = require('koa-bodyparser')
const koaBody = require('koa-body')({
	multipart: true,
	uploadDir: '.'
})
const session = require('koa-session')
//const jimp = require('jimp')

/* IMPORT CUSTOM MODULES */
const User = require('./modules/user')

const app = new Koa()
const router = new Router()

/* CONFIGURING THE MIDDLEWARE */
app.keys = ['darkSecret']
app.use(staticDir('public'))
app.use(bodyParser())
app.use(session(app))
app.use(views(`${__dirname}/views`, {
	extension: 'handlebars',
	options: {
		partials: {
			navbar: `${__dirname}/views/partials/nav.handlebars`,
			footer: `${__dirname}/views/partials/footer.handlebars`
		}
	},
	map: {
		handlebars: 'handlebars'
	}
}))


const defaultPort = 8080
const port = process.env.PORT || defaultPort
const dbName = 'website.db'

/**
 * The website's home page.
 *
 * @name Home Page
 * @route {GET} /
 */
router.get('/', async ctx => {
	await ctx.render('homepage', {user: ctx.session.user})
	
})


/**
 * The user registration page.
 *
 * @name Register Page
 * @route {GET} /register
 */
router.get('/register', async ctx => {
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
 * The user download page.
 *
 * @name Download Page
 * @route {GET} /download
 */
router.get('/download', async ctx => await ctx.render('download'))

/**
 * The website about page.
 *
 * @name About Page
 * @route {GET} /about
 */
router.get('/about', async ctx => await ctx.render('about'))

/**
 * The script to process new user registrations.
 *
 * @name Register Script
 * @route {POST} /register
 */
router.post('/register', koaBody, async ctx => {
	try {
		const body = ctx.request.body
		// call the functions in the module
		const user = await new User(dbName)
		await user.register(body.user, body.pass)
		await user.uploadPicture(ctx.request.files.avatar.path, 'image/png', body.user)
		//logs user in after registry
		await user.login(body.user, body.pass)
		ctx.session.authorised = true
		//saving user name in session auth
		ctx.session.user = body.user
		ctx.redirect(`/?msg=new user "${body.user}" added`)
	} catch (err) {
		await ctx.render('error', {
			message: err.message
		})
	}
})

router.get('/login', async ctx => {
	const data = {}
	if (ctx.query.msg) data.msg = ctx.query.msg
	if (ctx.query.user) data.user = ctx.query.user

	console.log(data)
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

router.post('/login', async ctx => {
	try {
		const body = ctx.request.body
		const user = await new User(dbName)
		await user.login(body.user, body.pass)
		ctx.session.authorised = true
		ctx.session.user = body.user
		return ctx.redirect('/?msg=you are now logged in...')
	} catch (err) {
		await ctx.render('error', {
			message: err.message
		})
	}
})

router.get('/logout', async ctx => {
	ctx.session.authorised = null
	ctx.session.user = null
	ctx.redirect('/?msg=you are now logged out')
})

app.use(router.routes())
module.exports = app.listen(port, async() => console.log(`listening on port ${port}`))

