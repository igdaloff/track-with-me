var https = require('https');

exports.getFbData = function(accessToken, apiPath, callback) {
    
    var fullPath = ''
    if (apiPath.search('\\?') > -1){
        fullPath = apiPath + '&access_token=' + accessToken; //apiPath example: '/me/friends'
    } else {
        fullPath = apiPath + '?access_token=' + accessToken; //apiPath example: '/me/friends'
    }

    console.log("fullPath: " + fullPath)

    var options = {
        host: 'graph.facebook.com',
        port: 443,
        path: fullPath,
        method: 'GET'
    };



    var buffer = ''; //this buffer will be populated with the chunks of the data received from facebook
    var request = https.get(options, function(result){
        result.setEncoding('utf8');
        result.on('data', function(chunk){
            buffer += chunk;
        });

        result.on('end', function(){
            callback(buffer);
        });
    });

    request.on('error', function(e){
        console.log('error from facebook.getFbData: ' + e.message)
    });

    request.end();
}