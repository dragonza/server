import express from "express";
import http from "http";
import bodyParser from "body-parser";
import morgan from "morgan";
import router from './router';
import mongoose from 'mongoose';
import cors from 'cors';
const app = express();

//DB set up
mongoose.connect('mongodb://localhost/auth').catch((e) => { console.log(e); throw e })

// App Set up
app.use(morgan("combined"));
app.use(cors());
app.use(bodyParser.json({ type: "*/*" }));
router(app);

// Server set up

const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
// console.log("Server Listen to port", port);
