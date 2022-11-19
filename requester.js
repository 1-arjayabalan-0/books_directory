requests.get('http://localhost:3001/')
requests.get('http://localhost:3001/book-find/1')

requests.post('http://localhost:3001/book-insert')
requests.put('http://localhost:3001/book-edit/3')
requests.delete('http://localhost:3001/book-delete/2')


get('http://localhost:3001/')
get('http://localhost:3001/book-find/1')

post(
	'http://localhost:3001/book-insert',
	json= {
		    "id": 672,
		    "title": "The Mikado Method",
		    "isbn": "1617291218",
		    "pageCount": 0,
		    "publishedDate": {
		      "date": "2014-03-05T00:00:00.000-0800"
		    },
		    "thumbnailUrl": "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/ellnestam.jpg",
		    "status": "PUBLISH",
		    "authors": [
		      "Ola Ellnestam",
		      "Daniel Brolund"
		    ],
		    "categories": []
		  }
)
put(
	'http://localhost:3001/book-edit/1617291218',
	json= {
		    "id": 672,
		    "title": "The Mikado Method 2",
		    "isbn": "1617291218",
		    "pageCount": 500,
		    "publishedDate": {
		      "date": "2014-03-05T00:00:00.000-0800"
		    },
		    "thumbnailUrl": "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/ellnestam.jpg",
		    "status": "PUBLISH",
		    "authors": [
		      "Ola Ellnestam",
		      "Daniel Brolund"
		    ],
		    "categories": []
		  }
)
delete(
	'http://localhost:3001/book-delete/1617291218',
)