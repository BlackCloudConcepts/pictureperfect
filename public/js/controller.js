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
		this.pcFolderNavigation = new underpin.pagecontrols.foldernavigation({
			'container' : this.parameters.divFolderNavigation,
			'selectFolder' : function(folder){ _this.selectFolder(folder); },
			'searchResults' : function(data){ _this.searchResults(data); }
		});
		this.pcSubFolderNavigation = new underpin.pagecontrols.subfoldernavigation({
			'container' : this.parameters.divSubFolderNavigation,
			'selectSubFolder' : function(folder){ _this.selectSubFolder(folder); }
		});
		this.pcFooter = new underpin.pagecontrols.footer({
			'container' : this.parameters.divFooter
		});

		// load initial sections
		this.pcHeader.load();
		this.pcFolderNavigation.load();
		this.pcSubFolderNavigation.load();
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

	selectFolder : function(folder){
		this.pcSubFolderNavigation.render(folder);
	},

	selectSubFolder : function(folder){
		this.pcMain.spcPhotoDisplay.render(folder);
		this.pcFolderNavigation.clearInput('all');
	},

	searchResults : function(data){
		this.pcMain.spcPhotoDisplay.renderPhotos(data);
		this.pcSubFolderNavigation.clear();
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
