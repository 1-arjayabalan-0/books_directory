const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()

const bookRoute = require('./routes/books-dir');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use((req, res, next) => {
	res.header('Allow-Control-Allow-Origin', '*');
	res.header('Allow-Control-Allow-Header', '*');
	next();
})

app.use(bookRoute);

app.listen(process.env.PORT || '3001', (req, res) => {
	console.log('listening on Port:3001');
})