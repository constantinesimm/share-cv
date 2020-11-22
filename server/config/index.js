const { join } = require('path');
require('dotenv').config({ path: join(__dirname + '/../../.env')});

module.exports = {
	appBaseUrl: process.env.NODE_ENV !== 'production' ? 'http://app.localhost:8080' : 'https://app.share-cv.com',
	secretString: process.env.CONTROL_STRING,
	staticBasePath: process.env.NODE_ENV !== 'production' ? 'public' : 'dist',
	database: {
		mongodb: {
			uri: process.env.NODE_ENV !== 'production' ?
				`mongodb://localhost:27017/${ process.env.DB_NAME }` :
				`mongodb+srv://${ process.env.DB_USER }:${ process.env.DB_USER_PASS }@${ process.env.DB_HOST }/${ process.env.DB_NAME }?retryWrites=true&w=majority`,
			options: {
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useFindAndModify: false
			}
		}
	},
	smtp: {
		host: process.env.SMTP_HOST,
		port: process.env.SMTP_PORT,
		secure: false,
		requireTLS: true,
		auth: {
			user: process.env.SMTP_USER,
			pass: process.env.SMTP_PASSWORD
		}
	},
}
