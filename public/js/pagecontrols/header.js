// License: (MIT) Copyright (C) 2013 Scott Gay
underpin.pagecontrols.header = $.klass(underpin.pagecontrols.base, {
	initialize : function(parameters){
		this.parameters = parameters;
	},

	load : function(){
		var _this = this;
		this.getContainer();
		this.require_template('header-template');
		
		var template = _.template($('#header-template').html());
                this.container.html(template);
	},

	unload : function(){
		this.destroyControl();
	}
});
