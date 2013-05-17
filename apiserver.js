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
					returnFolderList(response, query, path.join(process.cwd(), 'public/photos/'+query.path));
					break;
				case 'filesearchpeople' :
					returnFileSearch(response, query, path.join(process.cwd(), 'public/photos/'), 'people');
					break;
				case 'filesearchevent' :
					returnFileSearch(response, query, path.join(process.cwd(), 'public/photos/'), 'event');
					break;
				case 'files' : 
					returnFileList(response, query, path.join(process.cwd(), 'public/photos/'+query.path), '/photos/'+query.path);
					break;
			};
		});
  	});
  	server.listen(PORT);
}

// type, path, callback
function returnFolderList(response, query, path){
	fs.readdir(path, function(err, files){
		var arr = [];
		for (var f in files){
			if (files[f].indexOf('.') == -1){
				arr.push(files[f]);
			} 
		}
		response.write(query.callback+'('+JSON.stringify(arr)+')');
		response.end();
	});
}

// type, path, callback
function returnFileList(response, query, path, relativePath){
	fs.readdir(path, function(err, files){
		var arr = [];
		for (var f in files){
			if (files[f].indexOf('.') != -1){
				arr.push(relativePath+'/'+files[f]);
			} 
		}
		response.write(query.callback+'('+JSON.stringify(arr)+')');
		response.end();
	});
}

// type, str, callback
function returnFileSearch(response, query, path, type){
	var level1complete = 0;
        fs.readdir(path, function(err, files){
                // get all top level folders
                var level1 = [];
                for (var f in files){
                        if (files[f].indexOf('.') == -1){
                                level1.push(files[f]);
                        }
                }
                // get all level 2 folder
                var level2 = [];
                for (var l in level1){
			// call as a function to save state on the subpath during async file system query
			var getLevel2 = function(subpath){
				fs.readdir(path+'/'+level1[l], function(err, files){
					for (var f in files){
						if (files[f].indexOf('.') == -1){
						       level2.push(subpath+'/'+files[f]);
						}
					}
					level1complete++;
				});
			};
			getLevel2(level1[l]);
                }

		var intervalLevel1 = setInterval(function(){
			if (level1complete == level1.length){
				clearInterval(intervalLevel1);
				var level2complete = 0;
				var level2files = [];
				// at this point we have all the level2 folders
				for (l in level2){
					// call as a function to save state on the subpath during async file system query
					var getFiles = function(subpath){
						var sSubpath = subpath.split('/');
						fs.readdir(path+'/'+level2[l], function(err, files){
							for (var f in files){
								if (files[f].indexOf('.') != -1){
								       level2files.push('/photos/'+sSubpath[sSubpath.length-2]+'/'+sSubpath[sSubpath.length-1]+'/'+files[f]);
								}
							}
							level2complete++;
						});
					};
					getFiles(path+'/'+level2[l]);
				}
				
				var intervalLevel2 = setInterval(function(){
					if (level2complete == level2.length){
						clearInterval(intervalLevel2);
						// now from the files found, return any that match the search criteria
						var searchFiles = [];
						for (l2f in level2files){
							var sFiles = level2files[l2f].split('/');
							if (type == 'people'){
								if (sFiles[sFiles.length-1].toLowerCase().split('-')[2].indexOf(query.str.toLowerCase()) != -1)
									searchFiles.push(level2files[l2f]);
							} else if (type == 'event'){
								if (sFiles[sFiles.length-1].toLowerCase().split('-')[0].indexOf(query.str.toLowerCase()) != -1)
									searchFiles.push(level2files[l2f]);
							}
						}
				                response.write(query.callback+'('+JSON.stringify(searchFiles)+')');
        				        response.end();	
					}
				}, 500);
			}
		}, 500);
        });
}
