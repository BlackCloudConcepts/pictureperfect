// EXAMPLE CALL
// node resize.js /srv/pictureperfect/public_html/pictureperfect/renameexample 600
var path = process.argv[2];
var size = process.argv[3];

var sys = require('sys')
var exec = require('child_process').exec;
var fs = require("fs");

fs.readdir(path, function(err, files){
	var count = 0;
	for (var f in files){
		// adjust the path to imagemagick installation as needed
		var cmd = "/usr/bin/convert "+path+"/"+files[f]+" -resize '"+size+"' "+path+"/"+files[f];

		var runme = function(cmd){ run(cmd); };
		// adjust the time to wait before the next call based on what your server is setup to handle. 
		// alternatively ... adapt this to wait until the previous command is complete and in the callback exec the next command

		setTimeout(runme, count*3000, cmd);

		count++;
	}
});

function run(cmd){
	console.log(cmd);
	exec(cmd, function(error, stdout, stderr){ 
	});
}
