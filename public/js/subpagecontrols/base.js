// License: (MIT) Copyright (C) 2013 Scott Gay
underpin.subpagecontrols.base = $.klass(underpin.base, {
    // gets the main container for the page
    getContainer : function()
    {
	// this creates a container for each subpagecontrol
        this.container = $('<div>').appendTo(this.parameters.container);
    },

    destroyControl : function(){
        this.container.remove();
    },

    hidePage : function(){
        this.container.hide();
    },

    showPage : function(){
        this.container.show();
    }
});
