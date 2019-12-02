#!/usr/bin/env node

'use strict'

/* MODULE IMPORTS */
/**
 * filesRouts.js defines the routes for uploaded and downloaded files.
 * @requires "Router"
 * @requires "koaBody"
 */
const Router = require('koa-router')
const koaBody = require('koa-body')({
	multipart: true,
	uploadDir: '.'
})

/* IMPORT CUSTOM MODULES */
const Download = require('../modules/filesDownload')
const Upload = require('../modules/filesUpload')
const nMailer = require('../modules/nodemailer')
const userModule = require('../modules/user')

const router = new Router()
const dbName = 'website.db'
const isEmailInput = /\S+@\S+\.\S+/ //RegEx  something@something.som

/**
 * The user download list page.
 *
 * @name MyDownloads Page
 * @route {GET} /myDownloads
 */
router.get('/myDownloads/', async ctx => {
	try {
		if (ctx.session.authorised === null) {
			ctx.redirect('/?msg=page only available when logged in')
		}else{
			await ctx.render('myDownloads', {
				user: ctx.session.user
			})
		}
	} catch (err) {
		await ctx.render('error', {
			message: err.message
		})
	}
})

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
 * The website's home/upload page after upload is done.
 *
 * @name Home Page
 * @route {POST} /
 */
// eslint-disable-next-line max-lines-per-function
router.post('/upload', koaBody, async ctx => {
	try {
		const upload = await new Upload(dbName)
		const download = await new Download(dbName)
		const body = ctx.request.body
		const file = ctx.request.files.file
		const user = await new userModule(dbName)
		await upload.getSenderEmailWithUsername(ctx.session.user)
		if (isEmailInput.test(ctx.request.body.emailOrUsername)) {
			await upload.uploadFiles(file.path, file.type, file.name)
			await upload.sendFileWithReceiverEmail(body.emailOrUsername)
		}else {
			await user.getUser(body.emailOrUsername,'user')
			await upload.uploadFiles(file.path, file.type, file.name)
			await upload.sendFileWithReceiverUsername(body.emailOrUsername)
		}
		const encryptedFileName = await upload.makeHash(file.name)
		await upload.storeHash(encryptedFileName, file.name)
		const getFileEncripted = await download.getHash(encryptedFileName)
		const nodeEmailer = await new nMailer(getFileEncripted)
		await nodeEmailer.sendEmail()
		ctx.redirect(`/?msg=new user "${file.name}" uploaded`)
		upload.db.close()
	} catch (err) {
		await ctx.render('error', {
			message: err.message
		})
	}
})

/**b
 * The single download page.
 *
 * @name FileDownload Page
 * @route {GET} /downloadFile
 */
router.get('/downloadFile/:encryptedFileName', async ctx => {
	const fileSender = await new Download(dbName)
	const downloadID = await fileSender.getDownloadId(ctx.params.encryptedFileName)
	const download = await fileSender.download(downloadID.downloadId)
	const downloadName = await fileSender.getName(downloadID.downloadId)
	if (ctx.session.authorised === true) {
		await ctx.render('downloadFile', {
			filePath: download.filePath,
			fileName: downloadName.fileName,
			user: ctx.session.user,
			id: ctx.params.encryptedFileName
		})
	} else {
		await ctx.render('downloadFile', {
			filePath: download.filePath,
			fileName: downloadName.fileName,
			id: ctx.params.encryptedFileName
		})
	}
})

/**
 * The single download page.
 *
 * @name FileDownload Page
 * @route {POST} /downloadFile
 */
router.post('/downloadFile/:encryptedFileName', async ctx => {
	try {		

		const fileSender = await new Download(dbName)
		console.log('hello')
		const downloadID = await fileSender.getDownloadId(ctx.params.encryptedFileName)
		console.log(downloadID.downloadId)
		await fileSender.deleteFile(downloadID.downloadId)
		console.log('hello')
		ctx.redirect('/?msg=File downloaded and deleted successfully!')
	} catch (err) {
		console.log(err)
	}
})

module.exports = router
