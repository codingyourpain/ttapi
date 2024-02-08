const express = require('express');

var data = require('../functions/data.js');

function chat(router) {
    router.get('/:username/chat',(req,res,next)=>{
        const productID= req.params.username;  //accessing the URL parameter
        if (data[productID]) {
            res.status(200).json(
                data[productID].chat
            );
        }
        else res.status(200).json(
            {
                error : 'some fucking errors!'
            }
        );
    });
    router.get('/:username/chat/remove/:index',(req,res,next)=>{
        const productID= req.params.username;  //accessing the URL parameter
        const index = parseInt(req.params.index);
        if (data[productID]) {
            data[productID].chat.splice(index, 1);
            res.status(200).json({
                status:"removed"
            });
        }
        else res.status(200).json(
            {
                error : 'some fucking errors!'
            }
        );
    });
    router.get('/:username/chat/:index',(req,res,next)=>{
        const productID= req.params.username;  //accessing the URL parameter
        const index = parseInt(req.params.index);
        if (data[productID]) {
            res.status(200).json(
                data[productID].chat[index]
            );
        }
        else res.status(200).json(
            {
                error : 'some fucking errors!'
            }
        );
    });
}

module.exports=chat;