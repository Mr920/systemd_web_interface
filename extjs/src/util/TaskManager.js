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
// @tag extras,core
/**
 * A static {@link Ext.util.TaskRunner} instance that can be used to start and stop
 * arbitrary tasks. See {@link Ext.util.TaskRunner} for supported methods and task
 * config properties.
 *
 *     @example
 *     var task, clock;
 *     
 *     clock = Ext.getBody().appendChild({
 *         id: 'clock'
 *     });
 *     
 *     // Start a simple clock task that updates a div once per second 
 *     task = {
 *         run: function() {
 *             clock.setHtml(Ext.Date.format(new Date(), 'g:i:s A'));
 *         },
 *         interval: 1000
 *     };
 *     
 *     Ext.TaskManager.start(task);
 *
 * See the {@link #start} method for details about how to configure a task object.
 */
Ext.define('Ext.util.TaskManager', {
    extend: 'Ext.util.TaskRunner',

    alternateClassName: [
        'Ext.TaskManager'
    ],

    singleton: true
});
