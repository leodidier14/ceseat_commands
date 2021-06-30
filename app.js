var express = require('express');
var logger = require('morgan');

const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '.env') })
const mongoose = require('mongoose');

const { verifTokenAppController } = require('./controllers/tokenAppController')
const requestLog = require('./models/requestLog')
const route = '/api/orders/'
//Connect to db
mongoose.connect(process.env.DB_MONGO_CONNECT, {useNewUrlParser: true}, () =>
    console.log("connected to database")
);
//######### Display name and version ############// 
const apiinf = require('./models/apiinfo')
var pjson = require('./package.json');
console.log("name : " + pjson.name);
console.log("version : " + pjson.version);
const apiinfos = apiinf.findOneAndUpdate({name: pjson.name , port:process.env.PORT,path:route}, {version : pjson.version}, {upsert: true}).exec()
//################################################//
var router = require('./routes/routes');

var app = express();

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(async(req,res,next) => {
  console.log('new entry')
  const tokenapp = req.headers['tokenapp'];
  checkTokenApp = await verifTokenAppController(tokenapp) 
  if(checkTokenApp)
    next()
  else 
    res.status(400).send('not an authentified APP ')
})

app.use((req,res,next) => {
  requestLog.create({name:pjson.name,date: Date.now()}, (err)=> {
    if(err) console.log(err)
  })
  next()
})


app.use(route, router);




module.exports = app;
