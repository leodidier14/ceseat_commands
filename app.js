var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');

const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '.env') })
const mongoose = require('mongoose');

const { verifTokenAppController } = require('./controllers/tokenAppController')


//Connect to db
mongoose.connect(process.env.DB_MONGO_CONNECT, {useNewUrlParser: true}, () =>
    console.log("connected to database")
);
//######### Display name and version ############// 
const apiinf = require('./models/apiinfo')
var pjson = require('./package.json');
console.log("name : " + pjson.name);
console.log("version : " + pjson.version);
const apiinfos = apiinf.findOneAndUpdate({name: pjson.name , port:process.env.PORT}, {version : pjson.version}, {upsert: true}).exec()
//################################################//


var router = require('./routes/routes');

var app = express();

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(async(req,res,next) => {
  const tokenapp = req.headers['tokenapp'];
  checkTokenApp = await verifTokenAppController(tokenapp) 
  if(checkTokenApp)
    next()
  else 
    res.status(400).send('not an authentified APP ')
})

app.use('/api', router);





module.exports = app;
