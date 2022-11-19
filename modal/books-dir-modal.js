const mongoose = require('mongoose');
const db = require('../config/db');

const booksModal = new mongoose.Schema({
	id: {
		type: Number,
		required: false,
		unique: true
	},
	title: {
		type: String,
		required: true,
		unique: false
	},
	isbn: {
		type: String,
		required: true,
		unique: true
	},
	pageCount: {
		type: Number,
		required: false,
		unique: false
	},
	thumbnailUrl: {
		type: String,
		required: false,
		unique: true
	},
	longDescription: {
		type: String,
		required: false,
		unique: false
	},
	authors: {
		type: Array,
		required: false,
		unique: false
	},
	categories: {
		type: Array,
		required: false,
		unique: false
	},
	status: {
		type: String,
		required: false,
		unique: false
	},
	publishedDate: {
		date: {
			type: String,
			required: false,
			unique: false	
		}
	},
})


module.exports = books = mongoose.model('books', booksModal);