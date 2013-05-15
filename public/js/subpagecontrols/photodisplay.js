// License: (MIT) Copyright (C) 2013 Scott Gay
underpin.subpagecontrols.photodisplay = $.klass(underpin.subpagecontrols.base, {
	initialize : function(parameters){
		this.parameters = parameters;
	},

	load : function(){
		this.getContainer();
	},

	render : function(path){
		var _this = this;
		var request = {};
		request.parameters = {
			'type' 		: 'files',
			'path' 		: path
		};
		request.callback = function(data){
			_this.renderPhotos(data);
		};
		request.failcallback = function(data){
			console.log(data);
		};
		this.sendRequest(request);
	},

	renderPhotos : function(data){
		this.require_template('photodisplay-template');
		var template = _.template($('#photodisplay-template').html(), {mydata: data});
                this.container.html(template);


	},

	unload : function(){
		this.destroyControl();
	}
});
