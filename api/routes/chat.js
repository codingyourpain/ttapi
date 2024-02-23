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
    router.get('/:username/chat/addChat/:uniqeId/:userId/:comment',(req,res,next) =>{
        /*
        streamdata.chat.push({
                uniqueId : data.uniqueId,
                userId   : data.userId,
                comment  : data.comment,
            });
        */
       const productID= req.params.username;
       const uniqueId = req.params.uniqeId;
       const userId = req.params.userId;
       const comment = req.params.comment;
       if (data[productID]) {
            data[productID].chat.push({
                uniqueId : uniqueId,
                userId   : userId,
                comment  : comment,
            });
            res.status(200).json({
                uniqueId : uniqueId,
                userId   : userId,
                comment  : comment,
                status: "chat added"
            });
        }
        else res.status(200).json(
            {
                error : 'some fucking errors!'
            }
        );
    });
}

module.exports=chat;