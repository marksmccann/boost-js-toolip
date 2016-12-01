Boost JS Tooltip
==================================================
A style-free tooltip plugin for jQuery and [Boost JS](https://github.com/marksmccann/boost-js). While other plugins style your tooltip for you, this plugin only handles the functionality, leaving the layout styling up to you.


Installation
--------------------------------------
Install with npm:
```bash
npm install boost-js-tooltip
```
Install in browser:
```html
<script src="https://cdn.rawgit.com/marksmccann/boost-js-tooltip/v0.0.1/dist/tooltip.min.js"></script>
```

Usage
--------------------------------------

### Create Plugin
```javascript
var boost = require('boost-js');
// var boost = $.fn.boost; (browser install)

var tooltip = require('boost-js-tooltip');
// var tooltip = $.fn.boost.tooltip; (browser install)

$.fn.tooltip = boost( tooltip.plugin, tooltip.defaults );
```

### Markup Structure
```html
<button id="tooltip" title="Your tooltip message goes here">...</button>
```

### Instantiate Plugin
```javascript
$('#tooltip').tooltip();
```

Options
--------------------------------------
Name | Default | Description
--- | --- | ---
activeClass | `"is-visible"` | the class added to the tip when activated
tipClass | `"tooltip"` | a class added to the tip element
placement | `"top"` | the position of the tip relative to the source. Options: top, left, right, center.
idPrefix | `"tooltip-"` | prefix for tip's id when source element doesn't have one
margin | `10` | the number of pixels from the source element
onShow | `null` | a callback function called when the tooltip is visible
onHide | `null` | a callback function called when the tooltip is hidden
onInit | `null` | a callback function called when the tooltip is initialized
### Usage
```javascript
$('#tooltip').tooltip({
    onInit: function() {
        console.log( this.id ); // 'tooltip'
    }
});
```
\- or -
```html
<button id="tooltip" ... data-placement="bottom">...</button>
```

API
--------------------------------------
### show( fn )
Shows the tooltip. `fn`: optional callback function called after opening.
```javascript
instance.show();
```
### hide( fn )
Hides the tooltip. `fn`: optional callback function called after opening.
```javascript
instance.close();
```
### setPosition()
Calculates the sets the top/left position for the tip element.
```javascript
instance.setPosition();
```
### title
Stores the original value of the title attribute.
```javascript
instance.title;
```
### tip
The tooltip element.
```javascript
instance.tip;
```

Running Tests
--------------------------------------

```bash
$ npm install && npm test
```


License
--------------------------------------

Copyright © 2016, [Mark McCann](https://github.com/marksmccann).
Released under the [MIT license](LICENSE).