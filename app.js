const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv/config');
const morgan = require ('morgan');
const mongoose = require('mongoose');
const api = process.env.API_URL;
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler')
app.use(cors({ origin: 'http://localhost:5000', optionsSuccessStatus: 200 }));
app.use(express.json());
app.use(morgan('tiny'));

app.options('*', cors({ origin: 'http://localhost:5000', optionsSuccessStatus: 200 }));
app.use(authJwt());
app.use(errorHandler);
app.use('/public/uploads', express.static(__dirname+ '/public/uploads'));

//Routes
const categoriesRoutes = require("./routes/categories");
const productsRoutes = require("./routes/products");
const usersRoutes = require("./routes/users");
const ordersRoutes = require("./routes/orders");



app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);

mongoose.connect(process.env.CONNECTION_STRING)
.then(()=>{
    console.log("Mongodb Database is connected...")
}).catch((err)=>{
    console.log("Their is an Erron", err)
})

/*app.listen(5000, ()=>{
    console.log('Server is Running on http://localhost:5000')
})*/


var server = app.listen(process.env.PORT || 5000 , function(){
    var port = server.address().port;
    console.log("Express is working on port"+ port)
})