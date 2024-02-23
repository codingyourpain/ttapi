const express = require('express');

var data = require('../functions/data.js');

function like(router) {
    router.get('/:username/likes',(req,res,next)=>{
        const productID= req.params.username;  //accessing the URL parameter
        if (data[productID]) {
            res.status(200).json(
                data[productID].likes
            );
        }
        else res.status(200).json(
            {
                error : 'some fucking errors!'
            }
        );
    });
    router.get('/:username/likes/remove/:index',(req,res,next)=>{
        const productID= req.params.username;  //accessing the URL parameter
        const index = parseInt(req.params.index);
        if (data[productID]) {
            data[productID].likes.splice(index, 1);
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
    router.get('/:username/likes/:index',(req,res,next)=>{
        const productID= req.params.username;  //accessing the URL parameter
        const index = parseInt(req.params.index);
        if (data[productID]) {
            res.status(200).json(
                data[productID].likes[index]
            );
        }
        else res.status(200).json(
            {
                error : 'some fucking errors!'
            }
        );
    });
    router.get('/:username/likes/addLike/:uniqeId/:userId/:likeCount',(req,res,next) =>{
        /*
        streamdata.likes.push({
                uniqueId : data.uniqueId,
                userId   : data.userId,
                likeCount   : data.likeCount,
            });
        */
       const productID= req.params.username;
       const uniqueId = req.params.uniqeId;
       const userId = req.params.userId;
       const likeCount = parseInt(req.params.likeCount);
       if (data[productID]) {
            data[productID].likes.push({
                uniqueId : uniqueId,
                userId   : userId,
                likeCount  : likeCount,
            });
            res.status(200).json({
                uniqueId : uniqueId,
                userId   : userId,
                likeCount  : likeCount,
                status: "like added"
            });
        }
        else res.status(200).json(
            {
                error : 'some fucking errors!'
            }
        );
    });
}

module.exports=like;