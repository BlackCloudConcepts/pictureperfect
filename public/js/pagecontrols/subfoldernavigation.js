// License: (MIT) Copyright (C) 2013 Scott Gay
underpin.pagecontrols.subfoldernavigation = $.klass(underpin.pagecontrols.base, {
	initialize : function(parameters){
		this.parameters = parameters;
	},

	load : function(){
		var _this = this;
		this.getContainer();
		
	},

	render : function(folder){
		var _this = this;
		this.container.html('');
		var request = {};
                request.parameters = {
                        'type'          : 'folders',
                        'path'          : folder
                };
                request.callback = function(data){
			_this.require_template('subfoldernavigation-template');
			var template = _.template($('#subfoldernavigation-template').html(), {mydata: data});
			_this.container.html(template);

			$.each(data, function(key, value){
				$('#subfolder'+value).bind('click', function(){
					_this.parameters.selectSubFolder(folder+value+'/');	
				});
			});
                };
                request.failcallback = function(data){
                        console.log(data);
                };
                this.sendRequest(request);

	},

	clear : function(){
		this.container.html('');
	},

	unload : function(){
		this.destroyControl();
	}
});
