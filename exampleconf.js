var apiport = 8151;
var webport = 8152;
var apiurl = 'http://10.30.3.209';

if (typeof(process) != 'undefined'){
	process.env.apiport = apiport;
	process.env.webport = webport;	
}


