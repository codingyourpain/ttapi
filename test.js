
var fs = require('fs');

const http = require('http');
const https = require('https');
const express = require('express');
var cors = require("cors");



var data = require('./api/functions/data.js');


//#region functions
function addUser(username) {
    data[username] = {
        username: username,
        connected:false,
        proccessing:false,
        chat:[],
        gifts:[],
        likes:[],
        follow:[],
        share:[]
    };
}


//#endregion
//addUser("bulut_44.44");

/*
Object.keys(data).forEach(key => {
    console.log(data[key]);
    proccess(data[key]);
});
*/


const app = express();
const router = require("./api/routes/product.js");
const simulate = require("./api/routes/simulator.js");


app.use(cors());

app.use('/addUser/:username',(req,res,next) => {
    const username = req.params.username;
    
    if (data[username]) res.status(200).json({
        username:username,
        message:username+" has been"
    });
    else {
        addUser(username);
        res.status(200).json({
            username:username,
            message:"Added to queue."
        });
    }
});
app.use('/products',router);
app.use('/simulator',simulate);



const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port);
console.log("listen");