const mongoose = require('mongoose');
const connectURI = 'mongodb+srv://payalad10:fRe0OdrqN5p1zBRG@cluster0.tooo4ly.mongodb.net/?retryWrites=true&w=majority'
// mongoose.set('strictQuery', false);
mongoose.connect(connectURI);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'error connecting to database'));
db.once('open', () => console.log("connected to database"));

//fRe0OdrqN5p1zBRG
//payalad10