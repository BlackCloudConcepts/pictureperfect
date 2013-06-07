// EXAMPLE CALL
// node resize.js /srv/pictureperfect/public_html/pictureperfect/renameexample 600
var path = process.argv[2];
var size = process.argv[3];

var sys = require('sys')
var exec = require('child_process').exec;
var fs = require("fs");

fs.readdir(path, function(err, files){
	for (var f in files){
		var cmd = "/usr/bin/convert "+path+"/"+files[f]+" -resize '"+size+"' "+path+"/"+files[f];
		exec(cmd, function(error, stdout, stderr){ 
		});
	}
});
