const express = require('express');

var data = require('../functions/data.js');

function gift(router) {
    router.get('/:username/gifts',(req,res,next)=>{
        const productID= req.params.username;  //accessing the URL parameter
        if (data[productID]) {
            res.status(200).json(
                data[productID].gifts
            );
        }
        else res.status(200).json(
            {
                error : 'some fucking errors!'
            }
        );
    });
    router.get('/:username/gifts/remove/:index',(req,res,next)=>{
        const productID= req.params.username;  //accessing the URL parameter
        const index = parseInt(req.params.index);
        if (data[productID]) {
            data[productID].gifts.splice(index, 1);
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
    router.get('/:username/gifts/:index',(req,res,next)=>{
        const productID= req.params.username;  //accessing the URL parameter
        const index = parseInt(req.params.index);
        if (data[productID]) {
            res.status(200).json(
                data[productID].gifts[index]
            );
        }
        else res.status(200).json(
            {
                error : 'some fucking errors!'
            }
        );
    });
    router.get('/:username/gifts/addGift/:uniqeId/:userId/:giftId/:repeat',(req,res,next) =>{
        /*
        streamdata.gifts.push({
                uniqueId : data.uniqueId,
                userId   : data.userId,
                giftId   : data.giftId,
                repeatCount : data.repeatCount
            });
        */
       const productID= req.params.username;
       const uniqueId = req.params.uniqeId;
       const userId = req.params.userId;
       const giftId = parseInt(req.params.giftId);
       const repeatCount = parseInt(req.params.repeat);
       if (data[productID]) {
            data[productID].gifts.push({
                uniqueId : uniqueId,
                userId   : userId,
                giftId  : giftId,
                repeatCount: repeatCount
            });
            res.status(200).json({
                uniqueId : uniqueId,
                userId   : userId,
                giftId  : giftId,
                repeatCount: repeatCount,
                status: "gift added"
            });
        }
        else res.status(200).json(
            {
                error : 'some fucking errors!'
            }
        );
    });
}

module.exports=gift;