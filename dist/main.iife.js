var main=function(e){"use strict";return e.isMobileByUa=function(e){return void 0===e&&(e=window.navigator.userAgent),/(Android|iPhone|Windows Phone|iPad|webOS|BlackBerry|mobile)/i.test(e)},e.padZero=function(e){return Number.isInteger(e)?e<10?"0".concat(e):String(e):e},e.typeOf=function(e,t){var r=typeof e;return"object"!==r?t?r.charAt(0).toUpperCase()+r.slice(1,r.length)==t:r.charAt(0).toUpperCase()+r.slice(1,r.length):t?Object.prototype.toString.call(e).replace(/^\[object (\S+)\]$/,"$1")==t:Object.prototype.toString.call(e).replace(/^\[object (\S+)\]$/,"$1")},Object.defineProperty(e,"__esModule",{value:!0}),e}({});
