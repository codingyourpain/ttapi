const express = require('express');

var data = require('../functions/data.js');

function follow(router) {
    router.get('/:username/follow',(req,res,next)=>{
        const productID= req.params.username;  //accessing the URL parameter
        if (data[productID]) {
            res.status(200).json(
                data[productID].follow
            );
        }
        else res.status(200).json(
            {
                error : 'some fucking errors!'
            }
        );
    });
    router.get('/:username/follow/remove/:index',(req,res,next)=>{
        const productID= req.params.username;  //accessing the URL parameter
        const index = parseInt(req.params.index);
        if (data[productID]) {
            data[productID].follow.splice(index, 1);
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
    router.get('/:username/follow/:index',(req,res,next)=>{
        const productID= req.params.username;  //accessing the URL parameter
        const index = parseInt(req.params.index);
        if (data[productID]) {
            res.status(200).json(
                data[productID].follow[index]
            );
        }
        else res.status(200).json(
            {
                error : 'some fucking errors!'
            }
        );
    });
    router.get('/:username/follow/addFollow/:uniqeId',(req,res,next) =>{
        /*
        streamdata.follow.push({
                uniqueId : data.uniqueId,
                followed   : true,
            });
        */
       const productID= req.params.username;
       const uniqueId = req.params.uniqeId;
       if (data[productID]) {
            data[productID].follow.push({
                uniqueId : uniqueId,
                followed: true,
            });
            res.status(200).json({
                uniqueId : uniqueId,
                followed: true,
                status: "follow added"
            });
        }
        else res.status(200).json(
            {
                error : 'some fucking errors!'
            }
        );
    });
}

module.exports=follow;