var apiport = 8151;
var webport = 8152;
var apiurl = 'http://198.58.127.16';

if (typeof(process) != 'undefined'){
	process.env.apiport = apiport;
	process.env.webport = webport;	
}


