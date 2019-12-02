'use strict'

const nodemailer = require('nodemailer')

module.exports = class nodeEmail {
	constructor(getFileEncripted) {
		this.senderEmail = getFileEncripted.senderEmail
		this.encryptedFileName = getFileEncripted.encryptedFileName
		this.receiverEmail = getFileEncripted.receiverEmail
	}
	async getInfo() {
		return [this.senderEmail, this.encryptedFileName, this.receiverEmail]
	}
	async sendEmail() {
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {user: 'sofiacirne12@gmail.com', pass: 'asdfgh123'}
		})
		const mailOptions = {

			from: 'sofiacirne12@gmail.com',
			to: this.receiverEmail,
			subject: `${this.senderEmail} has sent you a file`,
			text: `Download your file here: http://localhost:8080/downloadFile/${this.encryptedFileName}`}
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				console.log(error)
			} else {
				console.log(`Email sent: "${info.response}"`)
			}
		})
	}

}
