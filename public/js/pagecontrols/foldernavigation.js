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

	doSearch : function(str, type){
		var _this = this;
		var request = {};
                request.parameters = {
                        'type'          : 'filesearch'+type,
                        'str'          	: str
                };
                request.callback = function(data){
			_this.parameters.searchResults(data);
                };
                request.failcallback = function(data){
                        console.log(data);
                };
                this.sendRequest(request);

	},

	render : function(data){
		var _this = this;
	
		var dvSearch = $('<div>', {'class' : 'grid_4', 'style' : 'margin-bottom:10px;'}).appendTo(this.container);
		var dvSearchPeople = $('<div>', {'class' : 'grid_6', 'style' : 'margin-bottom:10px;'}).appendTo(this.container);
		var dvSearchEvents = $('<div>', {'class' : 'grid_6', 'style' : 'margin-bottom:10px;'}).appendTo(this.container);
		var dvFolders = $('<div>').appendTo(this.container);
		
		this.ctrlTextbox = new titan.controls.inputTextbox({
			'container'		: dvSearch,
			'placeholder'		: 'People / Event Code Search',
			'width'			: 200
		});
		this.ctrlTextbox.txtbox.keydown(function(evt){
			if (!evt)
                                evt = window.event;
                        var keyCode = evt.keyCode;
                        if (evt.charCode && keyCode == 0)
                                keyCode = evt.charCode;
                        if (keyCode == 13){
				_this.doSearch(_this.ctrlTextbox.getValue(), 'both');
				_this.clearInput('search');	
			}
		});

		this.ctrlDropdownPeople = new titan.controls.dropdown({
			'container'	: dvSearchPeople,
			'data'		: peopleData,
			'placeholder'	: 'Select Person',
			'width'		: 300,
			'onchange'	: function(item){
				_this.doSearch(item.value, 'people');
				_this.clearInput('people');	
			}	
		});

		var arrEvent = [];
		$.each(eventData, function(key, value){
			var hash = {
				'name' : _this.monthLookup(value.value.substring(4,6))+' '+value.value.substring(0,4)+' '+value.name,
				'value' : value.value,
				'image' : value.image
			};
			arrEvent.push(hash);
		});
		this.ctrlDropdownEvents = new titan.controls.dropdown({
			'container'	: dvSearchEvents,
			'data'		: arrEvent,
			'placeholder'	: 'Select Event',
			'width'		: 300,
			'onchange'	: function(item){
				_this.doSearch(item.value, 'event');
				_this.clearInput('events');	
			}	
		});

		this.require_template('foldernavigation-template');
		var template = _.template($('#foldernavigation-template').html(), {mydata: data});
                dvFolders.html(template);

		$.each(data, function(key, value){
			$('#folder'+value).bind('click', function(){
				_this.parameters.selectFolder(value+'/');	
			});
		});
	},

	clearInput : function(type){
		switch (type) {
			case 'search' :
				this.ctrlDropdownPeople.clearValue();
				this.ctrlDropdownEvents.clearValue();
				break;
			case 'people' : 
				this.ctrlTextbox.setValue('');
				this.ctrlDropdownEvents.clearValue();
				break;
			case 'events' : 
				this.ctrlTextbox.setValue('');
				this.ctrlDropdownPeople.clearValue();
				break;
			default :
				this.ctrlTextbox.setValue('');
				this.ctrlDropdownPeople.clearValue();
                                this.ctrlDropdownEvents.clearValue();
                                break;
		}
	},

	unload : function(){
		this.destroyControl();
	}

});
