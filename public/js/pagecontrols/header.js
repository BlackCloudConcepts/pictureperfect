// License: (MIT) Copyright (C) 2013 Scott Gay
underpin.pagecontrols.header = $.klass(underpin.pagecontrols.base, {
	initialize : function(parameters){
		this.parameters = parameters;
		this.parameters.container.addClass('pagecontrolhighlight');
	},

	load : function(){
		var _this = this;
		this.getContainer();
		this.require_template('header-template');
		
		var template = _.template($('#header-template').html());
                this.container.html(template);

		$('#mainlink').bind('click', function(){ _this.parameters.switchMain('main'); });
                $('#sectiononelink').bind('click', function(){ _this.parameters.switchMain('sectionone'); });
                $('#sectiontwolink').bind('click', function(){ _this.parameters.switchMain('sectiontwo'); });
                $('#infolink').bind('click', function(){ _this.parameters.switchMain('info'); });
                $('#sectiondatalink').bind('click', function(){ _this.parameters.switchMain('sectiondata'); });
	},

	unload : function(){
		this.destroyControl();
	}
});
