// import request from 'requests';
let helloWorld = `Hello World!`;
console.log(`${helloWorld} this is some ES6 JavaScript code`);
import express from "express";
import http from "http";
import bodyParser from "body-parser";
import morgan from "morgan";
import router from './router';
import mongoose from 'mongoose';

const app = express();

//DB set up
console.log('test', );
mongoose.connect('mongodb://localhost/auth').catch((e) => { console.log(e); throw e })
console.log('test1', );

// App Set up
app.use(morgan("combined"));
app.use(bodyParser.json({ type: "*/*" }));
router(app);

// Server set up

const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log("Server Listen to port", port);
