const express = require('express');
const app = express();
const router = express.Router();
const booksModal = require('../modal/books-dir-modal');
const {v4: uuidv4} = require('uuid');
const multer = require('multer')

var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './public/images')
	},
	fileName: (req, file, cb) => {
		cb(null, Date.now()+file.originalName)
	}
})

var fileFilter = (req, file, cb) => {
	if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
		cb(null, true)
	}
	else {
		cb(null, false)
	}
}

var upload = multer({
	storage: storage,
	fileFilter: fileFilter
})

router.post('/upload-img', upload.single('file'), async (req, res) => {
	try{
		if(req.file) {
			const pathName = req.file.path;
			res.send({
				'status': 200,
				'data': req.file, pathName
			})
		}
		else {
			res.send({
				'status': 202,
				'data': [],
				'message': 'Something went Wrong'
			})	
		}
	}
	catch(err) {
		console.log(err);
	}
})

router.get('/books', async (req, res) => {
	try {
		let newBooks;
		const books = await booksModal.find();

		if(req.query.no) {
			newBooks = books.splice(0, req.query.no);
		}
		else {
			newBooks = books;
		}
		res.status(200).send({'status': 200,
							  'message': 'Books Fetched',
							  'data': newBooks
						  });
	}
	catch(err) {
		console.error(err);
	}
})


router.get('/book-find/:isbn', async (req, res) => {
	try {
		var {isbn} = req.params;
		const books = await booksModal.findOne({isbn: isbn});
		if(!books) return res.send('Book Do not Exists')

		res.status(200).send( {'status': 200,
							  'message': 'Books Fetched',
							  'data': books 
							  });
		console.log('books' + books);
	}
	catch(err) {
		console.error(err);
	}
})

router.post('/book-insert', async (req, res) => {
	try {

	let { id,
		  title, 
		  isbn,
		  pageCount,
		  thumbnailUrl,
		  longDescription,
		  authors,
		  categories,
		  status,
		  publishedDate
		} = req.body.body;

	const newBook = await booksModal.findOne({isbn: isbn});
	if(newBook) return res.send('Book Already Exists');

	const data = await booksModal.create(
				         {
				         	id, title, isbn, pageCount, thumbnailUrl, longDescription, 
				         	authors, categories, status, publishedDate
				          }
				        )
	data.save();

	res.send('Book Added');
	res.status(200).send( {'status': 200,
						  'message': 'Books Added',
						  });
	}
	catch(err) {
		console.error(err);
	}
})

router.put('/book-edit/:isbn', async (req, res) => {
	try{

		let { id,
			  title, 
			  isbn,
			  pageCount,
			  thumbnailUrl,
			  longDescription,
			  authors,
			  categories,
			  status,
			  publishedDate
			}  = req.body.body;

		isbn = req.params.isbn;
		const editData = await booksModal.findOne({isbn: isbn})

		if(!editData) return res.send('Book Not Exists');

		const updateValue = (val, prev) => !val ? prev : val;
		const data = {
			...editData,
			id: updateValue(id, editData.id),
			title: updateValue(title, editData.title),
			isbn: updateValue(isbn, editData.isbn),
			pageCount: updateValue(pageCount, editData.pageCount),
			thumbnailUrl: updateValue(thumbnailUrl, editData.thumbnailUrl),
			longDescription: updateValue(longDescription, editData.longDescription),
			authors: updateValue(authors, editData.authors),
			categories: updateValue(categories, editData.categories),
			status: updateValue(status, editData.status),
			publishedDate: updateValue(publishedDate, editData.publishedDate),
		}

		await booksModal.updateOne({isbn: isbn}, 
				{$set: 
				     {
				      id: data.id,
					  title:data.title, 
					  isbn: data.isbn,
					  pageCount: data.pageCount,
					  thumbnailUrl: data.thumbnailUrl,
					  longDescription: data.longDescription,
					  authors: data.authors,
					  categories: data.categories,
					  status: data.status,
					  publishedDate: data.publishedDate
				  }})
				  .then(() => {
				  	res.status(200).send( {'status': 200,
											  'message': 'Books Updated',
											  });
				  })
				  .catch((err) => {
				  	console.error(err);
				  })
	}
	catch(err) {
		console.error(err);
	}
	
});

router.delete('/book-delete/:isbn', async (req, res) => {
	try{
		const {isbn} = req.params;

		const deleteBook = await booksModal.findOne({isbn: isbn})
		if(!deleteBook) return res.send('No Book Exists')

		await booksModal.deleteOne({isbn: isbn})
		.then(() => {
			res.status(204).send( {'status': 200,
							  			 'message': 'Book Deleted',
							  });
		})
		.catch((err) => {
			console.error(err);
		})
	}
	catch(err) {
		console.error(err);
	}
})

module.exports = router;