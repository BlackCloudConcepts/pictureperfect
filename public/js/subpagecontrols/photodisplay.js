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
		var _this = this;
		this.data = data;
		this.require_template('photodisplay-template');
		var template = _.template($('#photodisplay-template').html(), {mydata: data});
                this.container.html(template);

		$.each(data, function(key, value){			
			var cleanValue = value.replace(/\//g, '').replace(/.jpg/g, '').replace(/.JPG/g, '').replace(/-/g, '').replace(/.png/g, '').replace(/.PNG/g, '');
			$('#'+cleanValue).bind('click', function(){
				_this.renderBigDisplay(cleanValue, value, key);
			});
		});	
	},

	renderBigDisplay : function(id, path, key){
		var _this = this;
		var blackout = $('<div>', {'class' : 'blackout'}).appendTo(document.body);
		var bigdisplay = $('<div>', {'class' : 'bigdisplay'}).appendTo(this.container);
		var navleft = undefined;
		var navright = undefined;
		$('<img>', {'src' : path, 'width' : '600'}).appendTo(bigdisplay);
		
		// person
		var arrPeopleSegment = path.split('/');
		var arrPeople = arrPeopleSegment[arrPeopleSegment.length-1].split('-')[2].split('_');
		var strPeople = '';
		$.each(arrPeople, function(key, value){
			$.each(peopleData, function(k,v){
				if (v.value == value)
					strPeople += v.name+', ';
			});
		});
		strPeople = strPeople.substring(0, strPeople.length-2);
		var dvPerson = $('<div>', {'class' : 'person'}).html(strPeople).appendTo(this.container);
		
		// event
		var arrEventSegment = path.split('/');
                var theEvent = arrEventSegment[arrEventSegment.length-1].split('-')[0];
		var strEvent = '';
		$.each(eventData, function(k,v){
			if (v.value == theEvent)
				strEvent += v.name;
		});
		strEvent = this.monthLookup(theEvent.substring(4,6))+' '+theEvent.substring(0,4)+' '+strEvent
                var dvEvent = $('<div>', {'class' : 'event'}).html(strEvent).appendTo(this.container);
		
		// previous
		if (this.data[0] != path){
			navleft = $('<div>', {'class' : 'arrowleft'}).appendTo(this.container).bind('click', function(){
				blackout.remove();
				bigdisplay.remove();
				dvPerson.remove();
				dvEvent.remove();
				if (navleft != undefined)
					navleft.remove();
				if (navright != undefined)
					navright.remove();
				var value = _this.data[key-1];
				var cleanValue = value.replace(/\//g, '').replace(/.jpg/g, '').replace(/-/g, '').replace(/.png/g, '');
				_this.renderBigDisplay(cleanValue, value, key-1);
			});
		}
		
		// next
		if (this.data[this.data.length-1] != path){
			navright = $('<div>', {'class' : 'arrowright'}).appendTo(this.container).bind('click', function(){
				blackout.remove();
				bigdisplay.remove();
				dvPerson.remove();
				dvEvent.remove();
				if (navleft != undefined)
					navleft.remove();
				if (navright != undefined)
					navright.remove();
				var value = _this.data[key+1];
				var cleanValue = value.replace(/\//g, '').replace(/.jpg/g, '').replace(/-/g, '').replace(/.png/g, '');
				_this.renderBigDisplay(cleanValue, value, key+1);
			});
		}
		
		// clear all	
		blackout.bind('click', function(){
			blackout.remove();
			bigdisplay.remove();
			dvPerson.remove();
			dvEvent.remove();
			if (navleft != undefined)
				navleft.remove();
			if (navright != undefined)
				navright.remove();
		});	

	},

	unload : function(){
		this.destroyControl();
	}
});
