#!/usr/bin/env node
'use strict'

/* MODULE IMPORTS */
const Koa = require('koa')
const views = require('koa-views')
const staticDir = require('koa-static')
const bodyParser = require('koa-bodyparser')
const session = require('koa-session')
const fileRoutes = require('./routs/filesRouts')
const userRoutes = require('./routs/userRouts')
//const jimp = require('jimp')

const app = new Koa()

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


app.use(fileRoutes.routes())
app.use(userRoutes.routes())
app.use(fileRoutes.allowedMethods())
app.use(userRoutes.allowedMethods())

module.exports = app.listen(port, async() => console.log(`listening on port ${port}`))

