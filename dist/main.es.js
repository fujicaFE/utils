var t=1e6,e=1e6,n="[big.js] ",r=n+"Invalid ",o=r+"decimal places",i=r+"rounding mode",c=n+"Division by zero",s={},a=void 0,u=/^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;function l(t,e,n,r){var o=t.c;if(n===a&&(n=t.constructor.RM),0!==n&&1!==n&&2!==n&&3!==n)throw Error(i);if(e<1)r=3===n&&(r||!!o[0])||0===e&&(1===n&&o[0]>=5||2===n&&(o[0]>5||5===o[0]&&(r||o[1]!==a))),o.length=1,r?(t.e=t.e-e+1,o[0]=1):o[0]=t.e=0;else if(e<o.length){if(r=1===n&&o[e]>=5||2===n&&(o[e]>5||5===o[e]&&(r||o[e+1]!==a||1&o[e-1]))||3===n&&(r||!!o[0]),o.length=e,r)for(;++o[--e]>9;)if(o[e]=0,0===e){++t.e,o.unshift(1);break}for(e=o.length;!o[--e];)o.pop()}return t}function f(t,e,n){var r=t.e,o=t.c.join(""),i=o.length;if(e)o=o.charAt(0)+(i>1?"."+o.slice(1):"")+(r<0?"e":"e+")+r;else if(r<0){for(;++r;)o="0"+o;o="0."+o}else if(r>0)if(++r>i)for(r-=i;r--;)o+="0";else r<i&&(o=o.slice(0,r)+"."+o.slice(r));else i>1&&(o=o.charAt(0)+"."+o.slice(1));return t.s<0&&n?"-"+o:o}s.abs=function(){var t=new this.constructor(this);return t.s=1,t},s.cmp=function(t){var e,n=this,r=n.c,o=(t=new n.constructor(t)).c,i=n.s,c=t.s,s=n.e,a=t.e;if(!r[0]||!o[0])return r[0]?i:o[0]?-c:0;if(i!=c)return i;if(e=i<0,s!=a)return s>a^e?1:-1;for(c=(s=r.length)<(a=o.length)?s:a,i=-1;++i<c;)if(r[i]!=o[i])return r[i]>o[i]^e?1:-1;return s==a?0:s>a^e?1:-1},s.div=function(e){var n=this,r=n.constructor,i=n.c,s=(e=new r(e)).c,u=n.s==e.s?1:-1,f=r.DP;if(f!==~~f||f<0||f>t)throw Error(o);if(!s[0])throw Error(c);if(!i[0])return e.s=u,e.c=[e.e=0],e;var h,p,d,g,v,m=s.slice(),y=h=s.length,w=i.length,b=i.slice(0,h),E=b.length,_=e,x=_.c=[],k=0,j=f+(_.e=n.e-e.e)+1;for(_.s=u,u=j<0?0:j,m.unshift(0);E++<h;)b.push(0);do{for(d=0;d<10;d++){if(h!=(E=b.length))g=h>E?1:-1;else for(v=-1,g=0;++v<h;)if(s[v]!=b[v]){g=s[v]>b[v]?1:-1;break}if(!(g<0))break;for(p=E==h?s:m;E;){if(b[--E]<p[E]){for(v=E;v&&!b[--v];)b[v]=9;--b[v],b[E]+=10}b[E]-=p[E]}for(;!b[0];)b.shift()}x[k++]=g?d:++d,b[0]&&g?b[E]=i[y]||0:b=[i[y]]}while((y++<w||b[0]!==a)&&u--);return x[0]||1==k||(x.shift(),_.e--,j--),k>j&&l(_,j,r.RM,b[0]!==a),_},s.eq=function(t){return 0===this.cmp(t)},s.gt=function(t){return this.cmp(t)>0},s.gte=function(t){return this.cmp(t)>-1},s.lt=function(t){return this.cmp(t)<0},s.lte=function(t){return this.cmp(t)<1},s.minus=s.sub=function(t){var e,n,r,o,i=this,c=i.constructor,s=i.s,a=(t=new c(t)).s;if(s!=a)return t.s=-a,i.plus(t);var u=i.c.slice(),l=i.e,f=t.c,h=t.e;if(!u[0]||!f[0])return f[0]?t.s=-a:u[0]?t=new c(i):t.s=1,t;if(s=l-h){for((o=s<0)?(s=-s,r=u):(h=l,r=f),r.reverse(),a=s;a--;)r.push(0);r.reverse()}else for(n=((o=u.length<f.length)?u:f).length,s=a=0;a<n;a++)if(u[a]!=f[a]){o=u[a]<f[a];break}if(o&&(r=u,u=f,f=r,t.s=-t.s),(a=(n=f.length)-(e=u.length))>0)for(;a--;)u[e++]=0;for(a=e;n>s;){if(u[--n]<f[n]){for(e=n;e&&!u[--e];)u[e]=9;--u[e],u[n]+=10}u[n]-=f[n]}for(;0===u[--a];)u.pop();for(;0===u[0];)u.shift(),--h;return u[0]||(t.s=1,u=[h=0]),t.c=u,t.e=h,t},s.mod=function(t){var e,n=this,r=n.constructor,o=n.s,i=(t=new r(t)).s;if(!t.c[0])throw Error(c);return n.s=t.s=1,e=1==t.cmp(n),n.s=o,t.s=i,e?new r(n):(o=r.DP,i=r.RM,r.DP=r.RM=0,n=n.div(t),r.DP=o,r.RM=i,this.minus(n.times(t)))},s.neg=function(){var t=new this.constructor(this);return t.s=-t.s,t},s.plus=s.add=function(t){var e,n,r,o=this,i=o.constructor;if(t=new i(t),o.s!=t.s)return t.s=-t.s,o.minus(t);var c=o.e,s=o.c,a=t.e,u=t.c;if(!s[0]||!u[0])return u[0]||(s[0]?t=new i(o):t.s=o.s),t;if(s=s.slice(),e=c-a){for(e>0?(a=c,r=u):(e=-e,r=s),r.reverse();e--;)r.push(0);r.reverse()}for(s.length-u.length<0&&(r=u,u=s,s=r),e=u.length,n=0;e;s[e]%=10)n=(s[--e]=s[e]+u[e]+n)/10|0;for(n&&(s.unshift(n),++a),e=s.length;0===s[--e];)s.pop();return t.c=s,t.e=a,t},s.pow=function(t){var n=this,o=new n.constructor("1"),i=o,c=t<0;if(t!==~~t||t<-1e6||t>e)throw Error(r+"exponent");for(c&&(t=-t);1&t&&(i=i.times(n)),t>>=1;)n=n.times(n);return c?o.div(i):i},s.prec=function(e,n){if(e!==~~e||e<1||e>t)throw Error(r+"precision");return l(new this.constructor(this),e,n)},s.round=function(e,n){if(e===a)e=0;else if(e!==~~e||e<-t||e>t)throw Error(o);return l(new this.constructor(this),e+this.e+1,n)},s.sqrt=function(){var t,e,r,o=this,i=o.constructor,c=o.s,s=o.e,a=new i("0.5");if(!o.c[0])return new i(o);if(c<0)throw Error(n+"No square root");0===(c=Math.sqrt(o+""))||c===1/0?((e=o.c.join("")).length+s&1||(e+="0"),s=((s+1)/2|0)-(s<0||1&s),t=new i(((c=Math.sqrt(e))==1/0?"5e":(c=c.toExponential()).slice(0,c.indexOf("e")+1))+s)):t=new i(c+""),s=t.e+(i.DP+=4);do{r=t,t=a.times(r.plus(o.div(r)))}while(r.c.slice(0,s).join("")!==t.c.slice(0,s).join(""));return l(t,(i.DP-=4)+t.e+1,i.RM)},s.times=s.mul=function(t){var e,n=this,r=n.constructor,o=n.c,i=(t=new r(t)).c,c=o.length,s=i.length,a=n.e,u=t.e;if(t.s=n.s==t.s?1:-1,!o[0]||!i[0])return t.c=[t.e=0],t;for(t.e=a+u,c<s&&(e=o,o=i,i=e,u=c,c=s,s=u),e=new Array(u=c+s);u--;)e[u]=0;for(a=s;a--;){for(s=0,u=c+a;u>a;)s=e[u]+i[a]*o[u-a-1]+s,e[u--]=s%10,s=s/10|0;e[u]=s}for(s?++t.e:e.shift(),a=e.length;!e[--a];)e.pop();return t.c=e,t},s.toExponential=function(e,n){var r=this,i=r.c[0];if(e!==a){if(e!==~~e||e<0||e>t)throw Error(o);for(r=l(new r.constructor(r),++e,n);r.c.length<e;)r.c.push(0)}return f(r,!0,!!i)},s.toFixed=function(e,n){var r=this,i=r.c[0];if(e!==a){if(e!==~~e||e<0||e>t)throw Error(o);for(e=e+(r=l(new r.constructor(r),e+r.e+1,n)).e+1;r.c.length<e;)r.c.push(0)}return f(r,!1,!!i)},s[Symbol.for("nodejs.util.inspect.custom")]=s.toJSON=s.toString=function(){var t=this,e=t.constructor;return f(t,t.e<=e.NE||t.e>=e.PE,!!t.c[0])},s.toNumber=function(){var t=Number(f(this,!0,!0));if(!0===this.constructor.strict&&!this.eq(t.toString()))throw Error(n+"Imprecise conversion");return t},s.toPrecision=function(e,n){var o=this,i=o.constructor,c=o.c[0];if(e!==a){if(e!==~~e||e<1||e>t)throw Error(r+"precision");for(o=l(new i(o),e,n);o.c.length<e;)o.c.push(0)}return f(o,e<=o.e||o.e<=i.NE||o.e>=i.PE,!!c)},s.valueOf=function(){var t=this,e=t.constructor;if(!0===e.strict)throw Error(n+"valueOf disallowed");return f(t,t.e<=e.NE||t.e>=e.PE,!0)};var h=function t(){function e(n){var o=this;if(!(o instanceof e))return n===a?t():new e(n);if(n instanceof e)o.s=n.s,o.e=n.e,o.c=n.c.slice();else{if("string"!=typeof n){if(!0===e.strict&&"bigint"!=typeof n)throw TypeError(r+"value");n=0===n&&1/n<0?"-0":String(n)}!function(t,e){var n,o,i;if(!u.test(e))throw Error(r+"number");t.s="-"==e.charAt(0)?(e=e.slice(1),-1):1,(n=e.indexOf("."))>-1&&(e=e.replace(".",""));(o=e.search(/e/i))>0?(n<0&&(n=o),n+=+e.slice(o+1),e=e.substring(0,o)):n<0&&(n=e.length);for(i=e.length,o=0;o<i&&"0"==e.charAt(o);)++o;if(o==i)t.c=[t.e=0];else{for(;i>0&&"0"==e.charAt(--i););for(t.e=n-o-1,t.c=[],n=0;o<=i;)t.c[n++]=+e.charAt(o++)}}(o,n)}o.constructor=e}return e.prototype=s,e.DP=20,e.RM=1,e.NE=-7,e.PE=21,e.strict=false,e.roundDown=0,e.roundHalfUp=1,e.roundHalfEven=2,e.roundUp=3,e}(),p={plus:function(t,e){return new h(t).plus(e).toNumber()},minus:function(t,e){return new h(t).minus(e).toNumber()},times:function(t,e){return new h(t).times(e).toNumber()},divide:function(t,e){return new h(t).div(e).toNumber()}},d={money:function(t,e){if(void 0===e&&(e={}),e.yuan&&null==e.precision?e=Object.assign({precision:2,yuan:!0},e):e.fen&&null==e.precision&&(e=Object.assign({precision:0,fen:!0},e)),null==t)return t;var n=t+"";return e.yuan?n=p.divide(n,100):e.fen&&(n=p.times(n,100)),(e.precision||0===e.precision)&&(n=parseFloat(n).toFixed(e.precision)+""),e.affix&&(n=e.affix+String(n)),e.suffix&&(n=String(n)+e.suffix),n},tax:function(t){return t.toUpperCase().replace(/[^A-Z0-9]/g,"")}};function g(t){void 0===t&&(t=window.navigator.userAgent);return/(Android|iPhone|Windows Phone|iPad|webOS|BlackBerry|mobile)/i.test(t)}function v(t){return Number.isInteger(t)?t<10?"0".concat(t):String(t):t}var m={phone:/^1\d{10}$/,personName:/^[\u4e00-\u9fa5_a-zA-Z0-9-]{2,16}$/,longtitude:/^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,15})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,15}|180)$/,latitude:/^(\-|\+)?([0-8]?\d{1}\.\d{0,15}|90\.0{0,15}|[0-8]?\d{1}|90)$/,idCard:/^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$|^([1-6][1-9]|50)\d{4}\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}$/,taxnum:/^[A-Z0-9]{15,20}$/},y=function(t,e){var n=typeof t;return"object"!==n?e?n.charAt(0).toUpperCase()+n.slice(1,n.length)==e:n.charAt(0).toUpperCase()+n.slice(1,n.length):e?Object.prototype.toString.call(t).replace(/^\[object (\S+)\]$/,"$1")==e:Object.prototype.toString.call(t).replace(/^\[object (\S+)\]$/,"$1")},w={inout_type:"112",voucher_type:"131",license_status:"132",card_type:"133",public_license_status:"134",auth_type:"136",customer_type:"137",license_type:"138",auth_status:"139",card_status:"143",identity_type:"173",education_type:"175",device_state:"182",menusystem_type:"183",abnormal_type:"185",record_type:"186",alarm_type:"188",devicename_type:"201",p_plate_color_type:"212",p_car_type:"213",public_cartype:"216",id_type:"218",cardvoucher_type:"237",elevator_type:"219",elevator_reason:"220",device_brand:"221",monitor_device_type:"221",platform_type:"226",schedule_type:"229",handle_method:"244",ops_type:"259",pay_way:"284",pay_type:"284",pay_type1:"211",pay_type_db:"249",pay_channel:"280",pay_source:"281"},b=function(){return b=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},b.apply(this,arguments)};function E(t,e,n,r){return new(n||(n=Promise))((function(o,i){function c(t){try{a(r.next(t))}catch(t){i(t)}}function s(t){try{a(r.throw(t))}catch(t){i(t)}}function a(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(c,s)}a((r=r.apply(t,e||[])).next())}))}function _(t,e){var n,r,o,i,c={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(s){return function(a){return function(s){if(n)throw new TypeError("Generator is already executing.");for(;i&&(i=0,s[0]&&(c=0)),c;)try{if(n=1,r&&(o=2&s[0]?r.return:s[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,s[1])).done)return o;switch(r=0,o&&(s=[2&s[0],o.value]),s[0]){case 0:case 1:o=s;break;case 4:return c.label++,{value:s[1],done:!1};case 5:c.label++,r=s[1],s=[0];continue;case 7:s=c.ops.pop(),c.trys.pop();continue;default:if(!(o=c.trys,(o=o.length>0&&o[o.length-1])||6!==s[0]&&2!==s[0])){c=0;continue}if(3===s[0]&&(!o||s[1]>o[0]&&s[1]<o[3])){c.label=s[1];break}if(6===s[0]&&c.label<o[1]){c.label=o[1],o=s;break}if(o&&c.label<o[2]){c.label=o[2],c.ops.push(s);break}o[2]&&c.ops.pop(),c.trys.pop();continue}s=e.call(t,c)}catch(t){s=[6,t],r=0}finally{n=o=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,a])}}}"function"==typeof SuppressedError&&SuppressedError;var x=function(t,e){var n,r,o,i=(n="function (e){\n    setInterval(function (){\n      this.postMessage(null)\n    },".concat(e,")\n  }"),r=new Blob(["("+n+")()"]),o=window.URL.createObjectURL(r),new Worker(o));return i.onmessage=t,i};function k(t){var e=typeof t;return null!=t&&("object"===e||"function"===e)}var j="object"==typeof global&&null!==global&&global.Object===Object&&global,O="object"==typeof globalThis&&null!==globalThis&&globalThis.Object===Object&&globalThis,R="object"==typeof self&&null!==self&&self.Object===Object&&self,S=O||j||R||Function("return this")();function C(t,e,n){var r,o,i,c,s,a,u=0,l=!1,f=!1,h=!0,p=!e&&0!==e&&"function"==typeof S.requestAnimationFrame;if("function"!=typeof t)throw new TypeError("Expected a function");function d(e){var n=r,i=o;return r=o=void 0,u=e,c=t.apply(i,n)}function g(t,e){return p?(S.cancelAnimationFrame(s),S.requestAnimationFrame(t)):setTimeout(t,e)}function v(t){var n=t-a;return void 0===a||n>=e||n<0||f&&t-u>=i}function m(){var t=Date.now();if(v(t))return y(t);s=g(m,function(t){var n=t-u,r=e-(t-a);return f?Math.min(r,i-n):r}(t))}function y(t){return s=void 0,h&&r?d(t):(r=o=void 0,c)}function w(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];var i=Date.now(),h=v(i);if(r=t,o=this,a=i,h){if(void 0===s)return function(t){return u=t,s=g(m,e),l?d(t):c}(a);if(f)return s=g(m,e),d(a)}return void 0===s&&(s=g(m,e)),c}return e=+e||0,k(n)&&(l=!!n.leading,i=(f="maxWait"in n)?Math.max(+n.maxWait||0,e):i,h="trailing"in n?!!n.trailing:h),w.cancel=function(){var t;void 0!==s&&(t=s,p?S.cancelAnimationFrame(t):clearTimeout(t)),u=0,r=a=o=s=void 0},w.flush=function(){return void 0===s?c:y(Date.now())},w.pending=function(){return void 0!==s},w}var T=function(){function t(t,e,n){void 0===e&&(e={}),void 0===n&&(n=[]),this.heartBeatContent="ping",this.heartBeatInterval=1e4,this.pongTimeout=8e3,this.reconnectTimeout=1e4,this.reconnectLimit=10,this.reconnectCount=0,this.dontReconnect=!1,this.networkError=!1,this.openError=!1,this.url="",this.config={},this.protocols=[],this.tReconnect=function(t,e,n){var r=!0,o=!0;if("function"!=typeof t)throw new TypeError("Expected a function");return k(n)&&(r="leading"in n?!!n.leading:r,o="trailing"in n?!!n.trailing:o),C(t,e,{leading:r,trailing:o,maxWait:e})}(this.reconnect,1e3,{leading:!0,trailing:!1}),this.url=t,this.config=e,this.protocols=n;try{this.init(t,e,n)}catch(t){this.openError=!0}}return t.prototype.init=function(t,e,n){var r=this;void 0===t&&(t=this.url),void 0===e&&(e=this.config),void 0===n&&(n=this.protocols);var o=e.open,i=e.message,c=e.error,s=e.close,a=e.beforeunload,u=e.heartBeat,l=void 0===u?{}:u,f=e.reconnect,h=void 0===f?{}:f,p=e.key,d=void 0===p?"":p;this.instance=new WebSocket(t,n),this.logkey=d,this.print("new",t,l,h),(null==l?void 0:l.interval)&&(this.heartBeatInterval=l.interval),(null==l?void 0:l.content)&&(this.heartBeatContent=l.interval),(null==l?void 0:l.fn)&&(this.heartBeatFn=l.fn),this.instance.onopen=function(t){r.dontReconnect=!1,r.print("open"),r.stopHeartBeat(),r.startHeartBeat(),o&&o(t)},this.instance.onmessage=function(t){r.logkey&&console.log("[output:ws]".concat(r.logkey," message %c ").concat(t.data),"color:#0f0;");var e=t.data;if("string"==typeof e&&!["pong","logout","kickedOut"].includes(e))try{e=JSON.parse(e)}catch(t){console.warn(t)}i&&i(e),r.reconnectCount=0,r.stopHeartBeat(),r.startHeartBeat()},this.instance.onclose=function(t){r.print("close"),s&&s(t),r.tReconnect(),window.navigator.onLine||(r.networkError=!0)},this.instance.onerror=function(t){r.print("error"),c&&c(t),r.tReconnect()},a&&(this.onbeforeunload=a)},t.prototype.startHeartBeat=function(){var t=this;this.checkNetwork();this.heartBeat=x(function(){var e;t.dontReconnect||(1==(null===(e=t.instance)||void 0===e?void 0:e.readyState)?(t.logkey&&console.log("[output:ws]".concat(t.logkey," heartbeat %c ").concat(t.heartBeatContent),"color:#0ff;"),t.heartBeatFn?t.heartBeatFn():t.instance.send(t.heartBeatContent),t.pongTimeoutId=setTimeout((function(){var e;t.print("pongTimeout"),null===(e=t.instance)||void 0===e||e.close()}),t.pongTimeout)):(t.print("error","断开状态，尝试重连",t.instance),t.tReconnect()))}.bind(this),this.heartBeatInterval)},t.prototype.stopHeartBeat=function(){clearTimeout(this.pongTimeoutId),function(t){try{t&&t.terminate()}catch(t){console.log(t)}}(this.heartBeat)},t.prototype.reconnect=function(){var t,e=this;this.dontReconnect||1!=(null===(t=this.instance)||void 0===t?void 0:t.readyState)&&(this.checkNetwork(),this.stopHeartBeat(),clearTimeout(this.reconnectTimeoutId),this.reconnectCount++,this.reconnectCount<this.reconnectLimit?this.reconnectTimeoutId=setTimeout((function(){clearTimeout(e.reconnectTimeoutId),e.reInit()}),this.reconnectTimeout):this.reconnectCount>=this.reconnectLimit&&(this.stopReconnect(),console.error("服务异常，请联系管理员!!!")))},t.prototype.stopReconnect=function(){this.dontReconnect=!0,clearTimeout(this.reconnectTimeoutId)},t.prototype.kill=function(){var t;this.print("kill"),this.stopReconnect(),this.stopHeartBeat(),null===(t=this.instance)||void 0===t||t.close(),this.instance=null},t.prototype.reInit=function(t){this.kill(),this.init(t)},t.prototype.checkNetwork=function(){1==this.networkError&&1==window.navigator.onLine&&(this.networkError=!1)},t.prototype.print=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this.logkey&&console.log.apply(console,function(t,e,n){if(n||2===arguments.length)for(var r,o=0,i=e.length;o<i;o++)!r&&o in e||(r||(r=Array.prototype.slice.call(e,0,o)),r[o]=e[o]);return t.concat(r||Array.prototype.slice.call(e))}(["[output:ws]".concat(this.logkey)],t,!1))},t}();function B(t){return JSON.parse(JSON.stringify(t))}["warn","error","table","group","groupEnd"].forEach((function(t){console[t]||(console[t]=console.log)}));const I={uid:"",appId:"",config:{baseURL:"",tokenKey:""},env:"prod",debug:!1,dict:{},systemConfig:{}},A=(t={})=>{I.debug&&(console.group("更新store"),console.log("更新前："),console.table(B(I)));for(const e in t)I[e]=t[e];I.debug&&(console.log("更新后："),console.table(B(I)),console.groupEnd())};var P={getDict:function(t,e,n){var r;return void 0===n&&(n={}),E(this,void 0,void 0,(function(){var o;return _(this,(function(i){switch(i.label){case 0:return(null===(r=I.dict[t])||void 0===r?void 0:r.length)?[2,I.dict[t]]:[4,this.get("/sys/dict/".concat(t),e,n)];case 1:return(o=i.sent()).success?(I.dict[t]=o.data,[2,o.data]):[2,Promise.reject()]}}))}))},getConfig:function(t,e,n){var r;return void 0===n&&(n={}),E(this,void 0,void 0,(function(){var o;return _(this,(function(i){switch(i.label){case 0:return(null===(r=I.systemConfig[t])||void 0===r?void 0:r.length)?[2,I.systemConfig[t]]:[4,this.get("/tparameters/systemConfig?codes=".concat(t),e,n)];case 1:return(o=i.sent()).success?(I.systemConfig[t]=o.data,[2,o.data]):[2,Promise.reject()]}}))}))}};Object.freeze(P);var N=function(t){console.warn("欢迎使用sdk"),this._engine=t,this.store=I,this.store.platform=t.platform,this.request=t.request,this.get=t.request.get,this.post=t.request.post,this._modules=P,this.setStore=A},U={dev:{host:"https://host1-dev.com",host2:"https://host2-dev.com"},test:{host:"https://host1-test.com",host2:"https://host2-test.com"},prod:{host:"https://host1.com",host2:"https://host2.com"}},D=function(t){void 0===t&&(t="");var e=t.split("&"),n={};return e.forEach((function(t){var e=t.indexOf("="),r=t.slice(0,e),o=t.slice(e+1);r&&(n[r]=o)})),n};var q,M,F=(q=function(t,e){var n;n=function(){function t(){for(var t=0,e={};t<arguments.length;t++){var n=arguments[t];for(var r in n)e[r]=n[r]}return e}return function e(n){function r(e,o,i){var c;if("undefined"!=typeof document){if(arguments.length>1){if("number"==typeof(i=t({path:"/"},r.defaults,i)).expires){var s=new Date;s.setMilliseconds(s.getMilliseconds()+864e5*i.expires),i.expires=s}i.expires=i.expires?i.expires.toUTCString():"";try{c=JSON.stringify(o),/^[\{\[]/.test(c)&&(o=c)}catch(t){}o=n.write?n.write(o,e):encodeURIComponent(String(o)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),e=(e=(e=encodeURIComponent(String(e))).replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent)).replace(/[\(\)]/g,escape);var a="";for(var u in i)i[u]&&(a+="; "+u,!0!==i[u]&&(a+="="+i[u]));return document.cookie=e+"="+o+a}e||(c={});for(var l=document.cookie?document.cookie.split("; "):[],f=/(%[0-9A-Z]{2})+/g,h=0;h<l.length;h++){var p=l[h].split("="),d=p.slice(1).join("=");this.json||'"'!==d.charAt(0)||(d=d.slice(1,-1));try{var g=p[0].replace(f,decodeURIComponent);if(d=n.read?n.read(d,g):n(d,g)||d.replace(f,decodeURIComponent),this.json)try{d=JSON.parse(d)}catch(t){}if(e===g){c=d;break}e||(c[g]=d)}catch(t){}}return c}}return r.set=r,r.get=function(t){return r.call(r,t)},r.getJSON=function(){return r.apply({json:!0},[].slice.call(arguments))},r.defaults={},r.remove=function(e,n){r(e,"",t(n,{expires:-1}))},r.withConverter=e,r}((function(){}))},t.exports=n()},q(M={exports:{}},M.exports),M.exports);I.config.tokenKey;var $=function(t){I.appId,I.uid;var e,n,r,o,i=I.debug,c=I.config,s=t.method.toUpperCase();i&&(console.group("请求"+t.url),console.log("url: ",t.url),console.log("入参: "),console.table("GET"===s?t.params:B(t.data)),console.log("完整请求配置："),console.table(B(t))),t.params=t.params||{},t.data=t.data||{},t.host=t.host||"host1",t.baseURL=(n=(e=t).env||I.env||"prod",r=e.host,e.baseURL?e.baseURL:U[n][r]),t.headers.token=(o=c.tokenKey,null!=F.get(o)?F.get(o):localStorage.getItem(o));var a=function(t){void 0===t&&(t="");var e=t.indexOf("?");if(-1===e)return[t];var n=t.slice(0,e),r=t.slice(e+1);return[n,D(r)]}(t.url);return 2===a.length&&(t.url=a[0],t.params=b(b({},a[1]),t.params)),"host1"===t.host||t.host,i&&(console.log("处理后的配置："),console.table(B(t)),console.groupEnd()),t},L=function(t){return t},H=require("axios/dist/axios").create({timeout:1e4});H.interceptors.request.use((function(t){return $(t)})),H.interceptors.response.use((function(t){var e=function(t){t.status;var e=t.config;return I.debug&&(console.group("请求响应"+e.url),console.log("请求响应：",t),console.table(t),200===t.status&&t.data&&(console.log("响应数据："),console.table(t.data)),console.groupEnd()),t}(t);if(200===e.status)return e.data;var n=e;return Promise.reject(n)}),L);var J=function(t){var e=new Proxy(t,{get:function(e,n,r){var o=t._modules;if("string"==typeof n&&["debug"].includes(n))return e.store[n];if("string"!=typeof n||0!==n.indexOf("_")){for(var i in o)if(n===i){var c=o[n],s=new Proxy(c,{get:function(e,n,r){return"function"==typeof e[n]?e[n]:t[n]},set:function(t,e,n){return!1}});return s}return e[n]}},set:function(t,e,n){return"debug"===e&&Reflect.set(t.store,e,n)}});return e}(new N({platform:"h5",request:{get:function(t,e,n){return void 0===n&&(n={}),H.get(t,b(b(b({},n),I.config),{method:"GET",params:e}))},post:function(t,e,n){return void 0===n&&(n={}),H.post(t,e,b(b(b({},n),I.config),{method:"POST"}))}}}));export{J as API,p as Calc,w as DICT_CODE,d as Format,m as Reg,T as WebsocketHeartBeat,g as isMobileByUa,v as padZero,y as typeOf};
