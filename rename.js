// EXAMPLE CALL
// node rename.js /srv/pictureperfect/public_html/pictureperfect/renameexample 201303WOW
var path = process.argv[2];
var foldername = process.argv[3];
var fs = require("fs");

fs.readdir(path, function(err, files){
	var fileSequence = 1;
	for (var f in files){
		var arrExtension = files[f].split('.');
		var fileSequenceDisplay = ('000' + fileSequence).substr(-3)
		fs.renameSync(path+"/"+files[f], path+"/"+foldername+"-"+fileSequenceDisplay+"--."+arrExtension[arrExtension.length-1]);
		fileSequence++;
	}
});
