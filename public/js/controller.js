// License: (MIT) Copyright (C) 2013 Scott Gay
underpin.controller = $.klass(underpin.base, {
	initialize : function(parameters){
		this.parameters = parameters;
	
		this.load();	
	},

	load : function(){
		var _this = this;

		// define sections
		this.pcHeader = new underpin.pagecontrols.header({
			'container' : this.parameters.divHeader,
			'switchMain' : function(page){ _this.switchMain(page); }
		});
		this.pcMain = new underpin.pagecontrols.main({
			'container' : this.parameters.divMain
		});
		this.pcFooter = new underpin.pagecontrols.footer({
			'container' : this.parameters.divFooter
		});

		// load initial sections
		this.pcHeader.load();
		this.pcFooter.load();
		this.liveMain = undefined;

		// backbone routes
		var Router = Backbone.Router.extend({
                	routes: {
				''		: 'main',
				'main'   	: 'main'
			}
		});
		this.router = new Router();
	        this.router.on('route:main', function(){ 
			if (_this.liveMain != undefined)
				_this.liveMain.unload();
                       	_this.pcMain.load();
                        _this.liveMain = _this.pcMain;
		});

		Backbone.history.start();

	},

	switchMain : function(page){
		switch (page) {
			case 'main' :
				this.router.navigate('main', {trigger:true});
				break;
		}
	},

	unload : function(){

	}
});
