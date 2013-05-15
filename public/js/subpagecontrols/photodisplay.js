// License: (MIT) Copyright (C) 2013 Scott Gay
underpin.subpagecontrols.photodisplay = $.klass(underpin.subpagecontrols.base, {
	initialize : function(parameters){
		this.parameters = parameters;
	},

	load : function(){
		this.getContainer();
		var request = {};
		request.parameters = {
			'type' 		: 'folders',
			'path' 		: ''
		};
		request.callback = function(data){
			console.log(data);
		};
		request.failcallback = function(data){
			console.log(data);
		};
		this.sendRequest(request);

	},

	unload : function(){
		this.destroyControl();
	}
});
