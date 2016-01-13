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
/**
 * Private utility class for Ext.layout.container.Border.
 * @private
 */
Ext.define('Ext.resizer.BorderSplitter', {
    extend: 'Ext.resizer.Splitter',

    uses: ['Ext.resizer.BorderSplitterTracker'],

    alias: 'widget.bordersplitter',

    // must be configured in by the border layout:
    collapseTarget: null,

    getTrackerConfig: function () {
        var trackerConfig = this.callParent();

        trackerConfig.xclass = 'Ext.resizer.BorderSplitterTracker';

        return trackerConfig;
    },
    
    onTargetCollapse: function(target) {
        this.callParent(arguments);
        if (this.performCollapse !== false && target.collapseMode == 'mini') {
            target.addCls(target.baseCls + '-' + target.collapsedCls + '-mini');
        }
    },

    onTargetExpand: function(target) {
        this.callParent(arguments);
        if (this.performCollapse !== false && target.collapseMode == 'mini') {
            target.removeCls(target.baseCls + '-' + target.collapsedCls + '-mini');
        }
    }
});
