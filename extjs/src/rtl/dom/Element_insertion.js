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
Ext.define('Ext.rtl.dom.Element_insertion', {
    override: 'Ext.dom.Element',

    wrap: function() {
        var parent = this.parent(),
            rtlCls = Ext.baseCSSPrefix + 'rtl',
            ltrCls = Ext.baseCSSPrefix + 'ltr',
            wrapEl = this.callParent(arguments),
            cls;

        // if the parentNode of the element being wrapped has the "x-rtl" or "x-ltr" css
        // class, then add that class to the wrapper as well.  This ensures that descendant
        // and child selectors still apply e.g. ".x-rtl > .x-foo" or ".x-ltr .x-foo"
        if (parent.hasCls(rtlCls)) {
            cls = rtlCls;
        } else if (parent.hasCls(ltrCls)) {
            cls = ltrCls;
        }

        if (cls) {
            // superclass method may return dom, so use fly() to access the wrap el
            Ext.fly(wrapEl, '_wrap').addCls(cls);
        }

        return wrapEl;
    }
});