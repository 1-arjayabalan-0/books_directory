const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.MONGO_URL;

const connection = mongoose.connect(url,
					 {useUnifiedTopology: true, useNewUrlParser: true}
				  );

module.exports = connection;
