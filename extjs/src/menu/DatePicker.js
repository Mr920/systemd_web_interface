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
 * A menu containing an Ext.picker.Date Component.
 *
 * Notes:
 *
 * - Although not listed here, the **constructor** for this class accepts all of the
 *   configuration options of **{@link Ext.picker.Date}**.
 * - If subclassing DateMenu, any configuration options for the DatePicker must be applied
 *   to the **initialConfig** property of the DateMenu. Applying {@link Ext.picker.Date Date Picker}
 *   configuration settings to **this** will **not** affect the Date Picker's configuration.
 *
 * Example:
 *
 *     @example
 *     var dateMenu = Ext.create('Ext.menu.DatePicker', {
 *         handler: function(dp, date){
 *             Ext.Msg.alert('Date Selected', 'You selected ' + Ext.Date.format(date, 'M j, Y'));
 *         }
 *     });
 *
 *     Ext.create('Ext.menu.Menu', {
 *         items: [{
 *             text: 'Choose a date',
 *             menu: dateMenu
 *         },{
 *             iconCls: 'add16',
 *             text: 'Icon item'
 *         },{
 *             text: 'Regular item'
 *         }]
 *     }).showAt([5, 5]);
 */
 Ext.define('Ext.menu.DatePicker', {
     extend: 'Ext.menu.Menu',

     alias: 'widget.datemenu',

     requires: [
        'Ext.picker.Date'
     ],

    /**
     * @cfg {Boolean} hideOnClick
     * False to continue showing the menu after a date is selected.
     */
    hideOnClick : true,

    /**
     * @cfg {String} pickerId
     * An id to assign to the underlying date picker.
     */
    pickerId : null,

    /**
     * @cfg {Number} maxHeight
     * @private
     */

    /**
     * @property {Ext.picker.Date} picker
     * The {@link Ext.picker.Date} instance for this DateMenu
     */

    initComponent : function(){
        var me = this,
            cfg = Ext.apply({}, me.initialConfig);
            
        // Ensure we clear any listeners so they aren't duplicated
        delete cfg.listeners;
            
        Ext.apply(me, {
            showSeparator: false,
            plain: true,
            bodyPadding: 0, // remove the body padding from the datepicker menu item so it looks like 3.3
            items: Ext.applyIf({
                cls: Ext.baseCSSPrefix + 'menu-date-item',
                margin: 0,
                border: false,
                id: me.pickerId,
                xtype: 'datepicker'
            }, cfg)
        });

        me.callParent(arguments);

        me.picker = me.down('datepicker');
        /**
         * @event select
         * @inheritdoc Ext.picker.Date#select
         */
        me.relayEvents(me.picker, ['select']);

        if (me.hideOnClick) {
            me.on('select', me.hidePickerOnSelect, me);
        }
    },

    hidePickerOnSelect: function() {
        Ext.menu.Manager.hideAll();
    }
 });