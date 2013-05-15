var cluster = require('cluster');
var PORT = +process.env.PORT || 8126;
var http = require("http")
var url = require("url")
var path = require("path")
var fs = require("fs")
//var express = require('express');
//var app = express();

if (cluster.isMaster) {
  	cluster.fork();
  	cluster.fork();

  	cluster.on('disconnect', function(worker) {
    		console.error('disconnect!');
    		cluster.fork();
  	});

} else {
	var domain = require('domain');

  	var server = require('http').createServer(function(request, response) {
		var d = domain.create();
		d.on('error', function(er) {
			console.error('error', er.stack);

			try {
				var killtimer = setTimeout(function() {
					process.exit(1);
				}, 30000);
				killtimer.unref();
				server.close();
				cluster.worker.disconnect();

				// try to send an error to the request that triggered the problem
				response.statusCode = 500;
				response.setHeader('content-type', 'text/plain');
				response.end('Oops, there was a problem!\n');
			} catch (er2) {
				console.error('Error sending 500!', er2.stack);
			}
		});

		d.add(request);
		d.add(response);

		d.run(function() {
			response.writeHead(200, {'Content-Type': 'text/plain'});
			var url_parts = url.parse(request.url, true);
			var query = url_parts.query;
			switch (query.type){
				case 'folders' :
					returnFolderList(response, path.join(process.cwd(), 'public/images/'+query.path));
					break;
				case 'files' : 
					returnFileList(response, path.join(process.cwd(), 'public/images/'+query.path));
					break;
			};
		});
  	});
  	server.listen(PORT);
}

function returnFolderList(response, path){
	fs.readdir(path, function(err, files){
		var arr = [];
		for (var f in files){
			if (files[f].indexOf('.') == -1){
				arr.push(files[f]);
			} 
		}
		response.write(JSON.stringify(arr));
		response.end();
	});
}

function returnFileList(response, path){
	fs.readdir(path, function(err, files){
		var arr = [];
		for (var f in files){
			if (files[f].indexOf('.') != -1){
				arr.push(files[f]);
			} 
		}
		response.write(JSON.stringify(arr));
		response.end();
	});
}


