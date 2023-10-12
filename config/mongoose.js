const mongoose = require('mongoose');
const connectURI = 'mongodb://localhost:27017/IssueTracker' || 'mongodb://127.0.0.1:27017/IssueTracker'
mongoose.set('strictQuery', false);
mongoose.connect(connectURI, {
    useNewUrlParser:true,useUnifiedTopology:true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'error connecting to database'));
db.once('open', () => console.log("connected to database"));