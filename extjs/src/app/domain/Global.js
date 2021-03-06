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
 * This class implements the global event domain. This domain represents event fired from
 * {@link Ext#globalEvents} Observable instance. No selectors are supported for this domain.
 * 
 * @private
 */
Ext.define('Ext.app.domain.Global', {
    extend: 'Ext.app.EventDomain',
    singleton: true,

    type: 'global',

    constructor: function() {
        var me = this;
        
        me.callParent();
        me.monitor(Ext.globalEvents);
    },
    
    /**
     * This method adds listeners on behalf of a controller. Since Global domain does not
     * support selectors, we skip this layer and just accept an object keyed by events.
     * For example:
     *
     *      domain.listen({
     *          idle: function() { ... },
     *          afterlayout: {
     *              fn: function() { ... },
     *              delay: 10
     *          }
     *      });
     *
     * @param {Object} listeners Config object containing listeners.
     *
     * @private
     */              
    listen: function(listeners, controller) {
        // Parent method requires selectors so we just wrap passed listeners
        // in a dummy selector
        this.callParent([{ global: listeners }, controller]);
    },

    match: function() {
        return true;
    }
});
