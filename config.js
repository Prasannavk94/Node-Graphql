const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://prasanna:'+encodeURIComponent('Pras@#$9944')+'@serverless-deploy-uuxst.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
});

const db = mongoose.connection;

module.exports = db;