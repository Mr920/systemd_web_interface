/*
This file is part of Ext JS 4.2

Copyright (c) 2011-2015 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial
Software License Agreement provided with the Software or, alternatively, in accordance with the
terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department
at http://www.sencha.com/contact.

Build date: 2015-07-29 13:28:30 (5d04230422a2a93197a6ac72739567d59f2539a4)
*/
Ext.define('ExtThemeNeptune.panel.Panel', {
    override: 'Ext.panel.Panel',
    border: false,
    bodyBorder: false,

    initBorderProps: Ext.emptyFn,

    initBodyBorder: function() {
        // The superclass method converts a truthy bodyBorder into a number and sets
        // an inline border-width style on the body element.  This prevents that from
        // happening if borderBody === true so that the body will get its border-width
        // the stylesheet.
        if (this.bodyBorder !== true) {
            this.callParent();
        }
    }
});
