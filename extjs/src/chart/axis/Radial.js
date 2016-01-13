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
 * @private
 */
Ext.define('Ext.chart.axis.Radial', {

    /* Begin Definitions */

    extend: 'Ext.chart.axis.Numeric',

    /* End Definitions */

    position: 'radial',

    alias: 'axis.radial',

    /**
     * @cfg {Number} maximum
     * The maximum value drawn by the axis. If not set explicitly, the axis
     * maximum will be calculated automatically.
     */

    /**
     * @cfg {Number} minimum
     * The minimum value drawn by the axis. Default is 0.
     */

    /**
     * @cfg {Number} [steps=10]
     * The number of circles to draw outward from the center.
     */

    drawAxis: function(init) {
        var me = this,
            chart = me.chart,
            surface = chart.surface,
            bbox = chart.getChartBBox(),
            store = chart.getChartStore(),
            l = store.getCount(),
            centerX = bbox.x + (bbox.width / 2),
            centerY = bbox.y + (bbox.height / 2),
            rho = Math.min(bbox.width, bbox.height) /2,
            sprites = [], sprite,
            steps = me.steps,
            i, j, pi2 = Math.PI * 2,
            cos = Math.cos, sin = Math.sin;
            
        if (l === 0) {
            return;
        }

        if (me.sprites && me.hasLines && !chart.resizing) {
            me.drawLabel();
            return;
        }

        if (!me.sprites || !me.hasLines) {
            if (!me.sprites) {
                //draw circles
                for (i = 1; i <= steps; i++) {
                    sprite = surface.add({
                        type: 'circle',
                        x: centerX,
                        y: centerY,
                        radius: Math.max(rho * i / steps, 0),
                        stroke: '#ccc'
                    });
                    sprite.setAttributes({
                        hidden: false
                    }, true);
                    sprites.push(sprite);
                }
            }
            //draw lines
            for (i = 0; i < l; i++) {
                sprite = surface.add({
                    type: 'path',
                    path: ['M', centerX, centerY, 'L', centerX + rho * cos(i / l * pi2), centerY + rho * sin(i / l * pi2), 'Z'],
                    stroke: '#ccc'
                });
                sprite.setAttributes({
                    hidden: false
                }, true);
                sprites.push(sprite);
                me.hasLines = true;
            }
        } else {
            sprites = me.sprites;
            for (i = 0; i < steps; i++) {
                sprites[i].setAttributes({
                    x: centerX,
                    y: centerY,
                    radius: Math.max(rho * (i + 1) / steps, 0),
                    stroke: '#ccc'
                }, true);
            }
            //draw lines
            for (j = 0; j < l; j++) {
                sprites[i + j].setAttributes({
                    path: ['M', centerX, centerY, 'L', centerX + rho * cos(j / l * pi2), centerY + rho * sin(j / l * pi2), 'Z'],
                    stroke: '#ccc'
                }, true);
                me.hasLines = true;
            }
        }
        me.sprites = sprites;

        me.drawLabel();
    },
    
    onRedraw: function(){
        this.drawAxis();
    },

    drawLabel: function() {
        var me = this,
            chart = me.chart,
            seriesItems = chart.series.items,
            series,
            surface = chart.surface,
            bbox = chart.chartBBox,
            store = chart.getChartStore(),
            data = store.data.items,
            ln, record,
            centerX = bbox.x + (bbox.width / 2),
            centerY = bbox.y + (bbox.height / 2),
            rho = Math.min(bbox.width, bbox.height) /2,
            max = Math.max, round = Math.round,
            labelArray = [], label,
            fields = [], nfields,
            categories = [], xField,
            aggregate = !me.maximum,
            maxValue = me.maximum || 0,
            minValue = me.minimum || 0,
            steps = me.steps, i = 0, j, dx, dy,
            pi2 = Math.PI * 2,
            cos = Math.cos, sin = Math.sin,
            display = me.label.display,
            draw = display !== 'none',
            margin = 10;

        if (!draw || chart.getStore().getCount() === 0) {
            return;
        }

        //get all rendered fields
        for (i = 0, ln = seriesItems.length; i < ln; i++) {
            series = seriesItems[i];
            fields.push(series.yField);
            xField = series.xField;
        }
        
        //get maxValue to interpolate
        for (j = 0, ln = data.length; j < ln; j++) {
            record = data[j];
            if (aggregate) {
                for (i = 0, nfields = fields.length; i < nfields; i++) {
                    maxValue = max(+record.get(fields[i]), maxValue);
                }
            }
            categories.push(record.get(xField));
        }
        if (!me.labelArray) {
            if (display != 'categories') {
                //draw scale
                for (i = 1; i <= steps; i++) {
                    label = surface.add({
                        type: 'text',
                        text: round(i / steps * maxValue),
                        x: centerX,
                        y: centerY - rho * i / steps,
                        'text-anchor': 'middle',
                        'stroke-width': 0.1,
                        stroke: '#333'
                    });
                    label.setAttributes({
                        hidden: false
                    }, true);
                    labelArray.push(label);
                }
            }
            if (display != 'scale') {
                me.labelArray = labelArray;
                me.setupTextItems(surface, categories, rho, margin, centerX, centerY);
            }
        } else {
            labelArray = me.labelArray;
            if (display != 'categories') {
                //draw values
                for (i = 0; i < steps; i++) {
                    labelArray[i].setAttributes({
                        text: round((i + 1) / steps * (maxValue - minValue) + minValue),
                        x: centerX,
                        y: centerY - rho * (i + 1) / steps,
                        'text-anchor': 'middle',
                        'stroke-width': 0.1,
                        stroke: '#333'
                    }, true);
                }
            }
            if (display != 'scale') {
                if (me.hasTextItems) {
                    for (j = 0, steps = categories.length; j < steps; j++) {
                        dx = cos(j / steps * pi2) * (rho + margin);
                        dy = sin(j / steps * pi2) * (rho + margin);
                        if (labelArray[i + j]) {
                            labelArray[i + j].setAttributes({
                                type: 'text',
                                text: categories[j],
                                x: centerX + dx,
                                y: centerY + dy,
                                'text-anchor': dx * dx <= 0.001? 'middle' : (dx < 0? 'end' : 'start')
                            }, true);
                        }
                    }
                } else {
                    me.setupTextItems(surface, categories, rho, margin, centerX, centerY);
                }
            }
        }
        me.labelArray = labelArray;
    },

    getRange: function () {
        var range = this.callParent();
        if (isNaN(this.minimum)) {
            range.min = 0;
        }
        return range;
    },
    
    setupTextItems: function(surface, categories, rho, margin, centerX, centerY) {
        var steps = categories.length,
            pi2 = Math.PI * 2,
            cos = Math.cos, sin = Math.sin,
            labelArray = this.labelArray,
            dx, dy, label, i;
            
        if (steps === 0 || this.hasTextItems) {
            return;
        }
            
        for (i = 0; i < steps; ++i) {
            dx = cos(i / steps * pi2) * (rho + margin);
            dy = sin(i / steps * pi2) * (rho + margin);
            label = surface.add({
                type: 'text',
                text: categories[i],
                x: centerX + dx,
                y: centerY + dy,
                'text-anchor': dx * dx <= 0.001? 'middle' : (dx < 0? 'end' : 'start')
            });
            label.setAttributes({
                hidden: false
            }, true);
            labelArray.push(label);
        }
        this.hasTextItems = true;
    },

    processView: function() {
        var me = this,
            seriesItems = me.chart.series.items,
            i, ln, series, ends, fields = [];

        for (i = 0, ln = seriesItems.length; i < ln; i++) {
            series = seriesItems[i];
            fields.push(series.yField);
        }
        me.fields = fields;

        delete me.maximum;
        ends = me.calcEnds();
        me.maximum = ends.to;
        me.steps = ends.steps;
    }
});