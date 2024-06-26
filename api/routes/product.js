const express = require('express');
const router = express.Router();

var data = require('../functions/data.js');
var proccess = require('../functions/tiktok.js');

var chat = require('./chat.js');
var like = require('./like.js');
var gift = require('./gift.js');
var follow = require('./follow.js');
var share = require('./share.js');

router.get('/',(req,res,next)=>{
    res.status(200).json(
        data
    );
});
router.get('/:username',(req,res,next)=>{
    const productID= req.params.username;  //accessing the URL parameter
    if (data[productID]) {
        if (!data[productID].connected && !data[productID].proccessing) {
            data[productID].proccessing = true;
            proccess(data[productID]);
        }
        res.status(200).json(
            data[productID]
        );
    }
    else res.status(200).json(
        {
            error : 'No such user!'
        }
    );
});
router.get('/:username/remove',(req,res,next)=>{
    const productID= req.params.username;  //accessing the URL parameter
    if (data[productID]) {
        data[productID].proccessing = false;
        proccess(data[productID]);
        delete  data[productID];
        res.status(200).json({
            stats:"removed"
        });
    }
    else res.status(200).json(
        {
            error : 'No such user!'
        }
    );
});
router.get('/:username/set/:param/:value',(req,res,next) => {
    const  username = req.params.username;
    const  param = req.params.param;
    const  value = req.params.value;
    if (data[username]){
        if (data[username][param]){
            data[username][param]=value;
            res.status(200).json({
                param:param,
                value:value,
                status:'changed'
            });
        }
        else {
            res.status(200).json({
                error:'no such property in this object'
            });
        }
    }
    else res.status(200).json(
        {
            error : 'No such user!'
        }
    );
});
router.get('/:username/simulate',(req,res,next)=>{
    const productID= req.params.username;  //accessing the URL parameter
    if (data[productID]) {
        if (!data[productID].connected && !data[productID].proccessing) {
            data[productID].proccessing = true;
            data[productID].connected = true;
        }
        res.status(200).json(
            data[productID]
        );
    }
    else res.status(200).json(
        {
            error : 'No such user!'
        }
    );
});
/*

data.forEach((key,element) => {
            if (streamdata === element){
                data[key] = null;
            }
        });*/

chat(router);
like(router);
gift(router);
follow(router);
share(router);
module.exports=router;