#!/usr/bin/env node

'use strict'

/* MODULE IMPORTS */
const Router = require('koa-router')
const send = require('koa-send')
const fs = require('fs')

/* IMPORT CUSTOM MODULES */
const Download = require('../modules/filesDownload')

const router = new Router()
const dbName = 'website.db'

/**
 * The user download list page.
 *
 * @name MyDownloads Page
 * @route {GET} /myDownloads
 */
router.get('/myDownloads/', async ctx => await ctx.render('myDownloads'))

/**
 * The website's home/upload page .
 *
 * @name Home Page
 * @route {GET} /
 */
router.get('/', async ctx => {
	await ctx.render('homepage', {user: ctx.session.user})
})

/**
 * The single download page.
 *
 * @name FileDownload Page
 * @route {GET} /downloadFile
 */
router.get('/downloadFile/:downloadId', async ctx => {
	const fileSender = await new Download(dbName)

	const filePath = await fileSender.download(ctx.params.downloadId)
	const downloadName = await fileSender.getName(ctx.params.downloadId)
	await ctx.render('downloadFile', {id: ctx.params.downloadId, filePath: filePath.filePath, fileName: downloadName.fileName})
})

/**
 * The single download page.
 *
 * @name FileDownload Page
 * @route {POST} /downloadFile
 */
router.post('/downloadFile/:downloadId', async ctx => {
	try{
		const fileSender = await new Download(dbName)

		await fileSender.deleteFile(ctx.params.downloadId)
		await ctx.redirect(`/?msg=File downloaded and deleted successfully!`)
	} catch(err) {
		console.log(err)
	}
})

module.exports = router
