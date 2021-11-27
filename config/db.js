const mongoose = require('mongoose');
require('dotenv').config()

const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_HOSTNAME = process.env.MONGO_HOSTNAME;
const MONGO_PORT = process.env.MONGO_PORT;
const MONGO_DB = process.env.MONGO_DB;

const url = `mongodb+srv://bothofus:bothofus@cluster0.56wf7.mongodb.net/Cluster0?retryWrites=true&w=majority`
// const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

mongoose.connect(url, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then((res) => {
    console.log('Connected')
}).catch((err) => {
    console.log(err)
});
