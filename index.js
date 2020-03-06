const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//CORS permite que un cliente se conecte a otro servidor para el intercambio
//de recuersos
const cors = require('cors');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/restapidb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//configurar cors
app.use(cors());

app.use('/', routes());

app.listen(5000);