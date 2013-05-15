// License: (MIT) Copyright (C) 2013 Scott Gay
underpin.pagecontrols.footer = $.klass(underpin.pagecontrols.base, {
	initialize : function(parameters){
		this.parameters = parameters;
		this.parameters.container.addClass('pagecontrolhighlight');
	},

	load : function(){
		this.getContainer();
		this.require_template('footer-template');

		var template = _.template($('#footer-template').html());
                this.container.html(template);

	},

	unload : function(){
		this.destroyControl();
	}
});
