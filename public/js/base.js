// License: (MIT) Copyright (C) 2013 Scott Gay
if (underpin == null){
	var underpin = {
		'pagecontrols' : {},
		'subpagecontrols' : {}
	};
}

underpin.base = $.klass({
	sendRequest : function(request, loadingContainer){
		// the structure of this api call can obviously change based on your needs.  
		// - action and collection might change to apiName and method for example
		// - change your apiURL
		// - adjust the jsonp call as necessary

		// http://www.ajaxload.info/ is a good resource for generating your own loading gif
		var ajaxLoader = undefined;
		if (loadingContainer != undefined)
			ajaxLoader = $('<img>', {'src' : '/images/ajax-loader.gif'}).appendTo(loadingContainer);

		var type = request.parameters.type;
		var path = request.parameters.path;
		var str = request.parameters.str;
		var callback = request.callback;
		var failcallback = request.failcallback;

		var apiURL = apiurl+":"+apiport;

		$.ajax({
			type: "POST",
			url: apiURL+"?random=" + this.getRandomNumber()+'&callback=?',
			data: "type=" + type + "&str="+str+"&path=" + path,
			dataType: "jsonp",
			success: function(data, status){
				if (ajaxLoader != undefined)
					ajaxLoader.remove();
				if (callback != undefined)
					callback(data);
			},
			error: function(data, e1, e2)
			{
				if (ajaxLoader != undefined)
					ajaxLoader.remove();
				var errorInfo = { 'data' : data, 'e1' : e1, 'e2' : e2 };
				if (failcallback != undefined)
					failcallback(errorInfo);
			}
		});
	},

	getRandomNumber : function(){
		var randomnumber=Math.floor(Math.random()*10000);
                return randomnumber;
	},

	require_template : function(templateName) {
	    var template = $('#template_' + templateName);
	    if (template.length === 0) {
		var tmpl_dir = '/templates';
		var tmpl_url = tmpl_dir + '/' + templateName + '.html';
		var tmpl_string = '';

		$.ajax({
		    url: tmpl_url,
		    method: 'GET',
		    async: false,
		    contentType: 'text',
		    success: function (data) {
			tmpl_string = data;
		    }
		});

		$('head').append('<script id="'+ templateName + '" type="text/template">' + tmpl_string + '<\/script>');
	    }
	},

	monthLookup : function(num){
		if (num == '01')
			return 'January';
		else if (num == '02')
			return 'February';
		else if (num == '03')
			return 'March';
		else if (num == '04')
			return 'April';
		else if (num == '05')
			return 'May';
		else if (num == '06')
			return 'June';
		else if (num == '07')
			return 'July';
		else if (num == '08')
			return 'August';
		else if (num == '09')
			return 'September';
		else if (num == '10')
			return 'October';
		else if (num == '11')
			return 'November';
		else if (num == '12')
			return 'December';
		else
			return '';
	}

});
