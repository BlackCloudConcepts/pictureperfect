// License: (MIT) Copyright (C) 2013 Scott Gay
underpin.pagecontrols.foldernavigation = $.klass(underpin.pagecontrols.base, {
	initialize : function(parameters){
		this.parameters = parameters;
	},

	load : function(){
		var _this = this;
		this.getContainer();

		var request = {};
                request.parameters = {
                        'type'          : 'folders',
                        'path'          : ''
                };
                request.callback = function(data){
			_this.render(data);
                };
                request.failcallback = function(data){
                        console.log(data);
                };
                this.sendRequest(request);
	},

	render : function(data){
		var _this = this;
		this.require_template('foldernavigation-template');
		var template = _.template($('#foldernavigation-template').html(), {mydata: data});
                this.container.html(template);

		$.each(data, function(key, value){
			$('#'+value).bind('click', function(){
				_this.parameters.selectFolder(value+'/');	
			});
		});
	},

	unload : function(){
		this.destroyControl();
	}
});
