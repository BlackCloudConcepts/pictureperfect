// License: (MIT) Copyright (C) 2013 Scott Gay
underpin.pagecontrols.main = $.klass(underpin.pagecontrols.base, {
	initialize : function(parameters){
		this.parameters = parameters;
	},

	load : function(){
		this.getContainer();
		new underpin.subpagecontrols.photodisplay({
			'container' : this.container
		}).load();
	},

	unload : function(){
		this.destroyControl();
	}
});
