var http = require('http');
var multiparty = require('multiparty')
var util = require('util');
var fs = require("fs");
var url = require('url');
var path = require('path');

http.createServer(function(req, res) {
    if (req.url != '/favicon.ico') {
        var index = req.url.lastIndexOf('.');
        var contentType = req.url.substr(index + 1);
        console.log(contentType);
        switch (contentType) {
            case '/':
                contentType = 'text/html';
                break;
            case 'js':
                contentType = 'text/javascript';
                break;
            case 'css':
                contentType = 'text/css';
                break;
            default:
                contentType = '';
                break;
        }
        if (req.url === '/') {
            req.url = "login.html";
        }
        if (req.url === '/upload') {
            res.writeHead(200, { 'charset': 'utf-8', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS' });
            var form = new multiparty.Form();
            form.encoding = 'utf-8';
            form.uploadDir = "./img";
            form.maxFilesSize = 2 * 1024 * 1024;
            form.parse(req, function(err, fields, files) {
                if (err) {
                    res.write('err');
                } else {
                    fs.renameSync(files.img[0].path, files.img[0].originalFilename)
                    var fileName = files.img[0].originalFilename;
                    var destPath = path.join(__dirname, "img", fileName);
                    var sourceFile = path.join(__dirname, fileName);
                    var readStream = fs.createReadStream(sourceFile);
                    var writeStream = fs.createWriteStream(destPath);
                    readStream.pipe(writeStream);
                    fs.unlinkSync(files.img[0].originalFilename);

                }
                res.end('success');
            });
        }
        if (req.url != '/upload') {
            var filePath = path.join(__dirname, req.url);
            res.writeHead(200, { "Content-Type": contentType, 'charset': 'utf-8', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS' });
            var readStream = fs.createReadStream(filePath);
            readStream.pipe(res);
        }
    }

}).listen(8888, function() {
    console.log('success');
});






// var http = require('http');
// var fs = require('fs');
// var url = require('url');
// var qs = require('querystring');


// var server = http.createServer(function(req, res) {
//     res.setHeader('Access-Control-Allow-Origin', '*')
//     res.writeHead(200, { 'Content-Type': 'image/jpeg' })
//     var urlObj = url.parse(req.url);
//     var temp = '';
//     // if (urlObj.pathname == '/login') {
//     //     var rs = fs.createReadStream('./login.html');
//     //     rs.pipe(res);
//     // }
//     if (urlObj.pathname == '/upload') {
//         req.on('data', function(chunk) {
//             temp += chunk;
//         });
//         req.on('end', function() {
//             var bf = Buffer(temp);
//             var bf64 = bf.toString('base64');

//             var img = bf64.toString();
//             console.log(img);

//             fs.writeFile('./img/1.jpg', img, function(err) {
//                     if (err) {
//                         console.log('err');
//                     }
//                 })
//                 // fs.writeFile('./img', temp, function(err) {
//                 //     console.log('err');
//                 // })

//         })
//     }
// });
// server.listen(8888, function() {
//     console.log('success');
// });