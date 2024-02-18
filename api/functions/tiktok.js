const { WebcastPushConnection } = require('tiktok-live-connector');
const { log } = require('console');

var data = require('./data.js');

function proccess(streamdata) {
    let tiktokLiveConnection = new WebcastPushConnection(streamdata.username);
    if (streamdata.proccessing){
        tiktokLiveConnection.connect().then(state => {
            console.info(`Connected to roomId ${state.roomId}`);
            streamdata.connected=true;
        }).catch(err => {
            console.error('Failed to connect', err);
            streamdata.connected=false;
        })
    }
    else tiktokLiveConnection.disconnect();
    // Connect to the chat (await can be used as well)
    

    // Define the events that you want to handle
    // In this case we listen to chat messages (comments)
    tiktokLiveConnection.on('chat', data => {
        if (streamdata.proccessing){
            console.log(`${data.uniqueId} (userId:${data.userId}) writes: ${data.comment}`);
            streamdata.chat.push({
                uniqueId : data.uniqueId,
                userId   : data.userId,
                comment  : data.comment,
            });
        }
        else tiktokLiveConnection.disconnect();
        
    })

    // And here we receive gifts sent to the streamer
    tiktokLiveConnection.on('gift', data => {
        if (streamdata.proccessing){
            console.log(`${data.uniqueId} (userId:${data.userId}) sends ${data.giftId}`);
            streamdata.gifts.push({
                uniqueId : data.uniqueId,
                userId   : data.userId,
                giftId   : data.giftId,
                repeatCount : data.repeatCount
            });
        }
        else tiktokLiveConnection.disconnect();
    })

    tiktokLiveConnection.on('like', data => {
        if (streamdata.proccessing){
            console.log(`${data.uniqueId} sent ${data.likeCount} likes, total likes: ${data.totalLikeCount}`);
            streamdata.likes.push({
                uniqueId : data.uniqueId,
                userId   : data.userId,
                likeCount   : data.likeCount,
            });
        }
        else tiktokLiveConnection.disconnect();
    })

    tiktokLiveConnection.on('disconnected', () => {
        console.log('Disconnected :(');
    })
    tiktokLiveConnection.on('streamEnd', (actionId) => {
        if (streamdata.proccessing){
            if (actionId === 3) {
                console.log('Stream ended by user');
            }
            if (actionId === 4) {
                console.log('Stream ended by platform moderator (ban)');
            }
        }
        else tiktokLiveConnection.disconnect();
    })
    tiktokLiveConnection.on('follow', (data) => {
        if (streamdata.proccessing){
            streamdata.follow.push({
                uniqueId : data.uniqueId,
                followed   : true,
            });
            console.log(data.uniqueId, "followed!");
        }
        else tiktokLiveConnection.disconnect();
    })
    tiktokLiveConnection.on('share', (data) => {
        if (streamdata.proccessing){
            streamdata.share.push({
                uniqueId : data.uniqueId,
                shared   : true,
            });
            console.log(data.uniqueId, "shared the stream!");
        }
        else tiktokLiveConnection.disconnect();
    })
    //log(streamdata);
    log(streamdata.proccessing);
}
module.exports = proccess;